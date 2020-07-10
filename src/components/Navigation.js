import { Component } from "react";
import moment from 'moment';
import Cookies from 'js-cookie';
import { axios, showError, viewPassword } from '../helpers';
import { withRouter } from 'next/router';
import { connect } from "react-redux";
import Router from 'next/router';
moment.locale('sr');

const initalState = {
    contentLogin: true,
    username: '',
    password: '',
    password_repeat: '',
    error: ''
}

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = initalState;
    }

    changeContent = async (contentLogin) => {
        await this.setState({ contentLogin, username: '', password: '', password_repeat: '', error: ''});

    }

    logout = async () => {
        Cookies.remove('user');
        try {
            await axios.post('/logout').then(res => res.data)
        } catch (err) {

        }
        Router.push('/')
    }

    inputRegisterChange = name => async event => {
        this.setState({ error: '' })
        await this.setState({ [name]: event.target.value });
    }

    inputLoginChange = name => async event => {
        this.setState({ error: '' });
        await this.setState({ [name]: event.target.value })
    }

    submitRegistration = async (event) => {

        event.preventDefault();

        const { username, password, password_repeat } = this.state;

        if (username.length <= 0 || password.length <= 0) {

            await this.setState({ error: 'Please fill all fields!' })

        }
        else if (!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {

            await this.setState({ error: 'Password should be at least 8 characters long, should have at least one alphabet letter, one special character and at least one number!.' })

        }

        else if (password.length < 8) {

            await this.setState({ error: 'Password must contain at least 8 characters!' })

        }

        else if (password !== password_repeat) {

            await this.setState({ error: 'Password doesent match!' })

        } else {
            try {
                await axios.post('/registration', { username, password }).then(res => res.data);
                await this.setState({ contentLogin: true, error: '' });
            } catch (err) {
                await this.setState({ error: await err.response.data.error })
            }
        }
    }

    submitLogin = async (event) => {
        event.preventDefault();

        const { username, password } = this.state;

        if (username.length <= 0 || password.length <= 0) {

            await this.setState({ error: 'Please fill all fields!' })

        }
        else if (!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {

            await this.setState({ error: 'Password should be at least 8 characters long, should have at least one alphabet letter, one special character and at least one number!' })

        }

        else if (password.length < 8) {

            await this.setState({ error: 'Password must contain at least 8 characters' })

        }

        else {

            try {
                const res = axios.post('/login', { username, password }).then(res => res.data);
                Cookies.set('user', await res);
                Router.push('/')
                await this.setState({ contentLogin: false, error: '' });
                $('#loginModal').modal('hide')
            } catch (err) {
                await this.setState({ error: await err.response.data.error })
            }

        }
    }


    login = (error) => {
        const { username, password } = this.state;
        return (
            <div className="auth_container mt-3">
                <form>
                    <div className="form-group">
                        <input type="text" value={username} onChange={this.inputLoginChange('username')} placeholder="Username" className="form-control" autoComplete="user_name" />
                        <i className="fa fa-user"></i>
                    </div>

                    <div className="form-group">
                        <input type="password" value={password} id="password_field" onChange={this.inputLoginChange('password')} placeholder="Lozinka" className="form-control" autoComplete="password_user" />
                        <i id="pass-status" className="fa fa-eye view_password_eye" aria-hidden="true" onClick={() => viewPassword("pass-status", "password_field")}></i>
                        <i className="fa fa-lock"></i>
                    </div>

                </form>

                {showError(error)}

                <div>
                    <button onClick={this.submitLogin} className="btn btn-primary font-weight-bold w-100 d-flex">
                        <div className="justify-content-center d-flex w-100">
                           LOG IN
                </div>
                    </button>
                </div>

                <div onClick={() => this.changeContent(false)} className="mt-3" style={{ cursor: 'pointer' }}>
                    <a className="text-light">You dont have account ? Register here .</a>
                </div>
            </div>

        )
    }

    registration = (error) => {
        const { username, password, password_repeat } = this.state;
        return (
            <div className="auth_container mt-3">
                <form>
                    <div className="form-group">
                        <input type="text" value={username} onChange={this.inputRegisterChange('username')} placeholder="Korisnicko ime" className="form-control" autoComplete="user_name" />
                        <i className="fa fa-user"></i>
                    </div>

                    <div className="form-group">
                        <input type="password" value={password} id="password_field" onChange={this.inputRegisterChange('password')} placeholder="Lozinka" className="form-control" autoComplete="password_new" />
                        <i id="pass-status" className="fa fa-eye view_password_eye" aria-hidden="true" onClick={() => viewPassword("pass-status", "password_field")}></i>
                        <i className="fa fa-lock"></i>
                    </div>

                    <div className="form-group">
                        <input type="password" value={password_repeat} id="password_field_repeat" onChange={this.inputRegisterChange('password_repeat')} placeholder="Potvrdi Lozinku" className="form-control" autoComplete="password_repeat" />
                        <i id="pass-status_repeat" className="fa fa-eye view_password_eye" aria-hidden="true" onClick={() => viewPassword("pass-status_repeat", "password_field_repeat")}></i>
                        <i className="fa fa-lock"></i>
                    </div>

                </form>

                {showError(error)}

                <div>
                    <button onClick={this.submitRegistration} className="btn btn-primary font-weight-bold w-100 d-flex">
                        <div className="justify-content-center d-flex w-100">
                            REGISTER
                </div>
                    </button>
                </div>

                <div onClick={() => this.changeContent(true)} className="mt-3" style={{ cursor: 'pointer' }}>
                    <a className="text-light">LOG IN</a>
                </div>
            </div>
        )
    }

    render() {
        const { error } = this.state;
        const { user } = this.props;
        return (
            <div>
                <div className="navigation_container">
                    <div className="d-flex align-items-center p-3">
                        {!user && <div className="align-items-center justify-content-end d-flex">
                            <a className="text-light font-weight-bold" style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#loginModal">
                                LOG IN

                                <i className="fa fa-user ml-3"></i>
                            </a>

                        </div>}

                        {user && <div onClick={this.logout} className="align-items-center justify-content-end d-flex">
                            <a className="text-light font-weight-bold" style={{ cursor: 'pointer' }}>
                                {user.user.username}
                                <i className="fa fa-user ml-3 mr-3"></i>
                                LOG OUT
                            </a>
                        </div>}

                    </div>
                </div>



                <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content bg_modal_content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" style={{ opacity: 1, color: '#fff', fontSize: '20px' }} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body pt-0 justify-content-center d-flex flex-column text-center">
                                {this.state.contentLogin == true && <div>
                                    {this.login(error)}
                                </div>}
                                {!this.state.contentLogin && <div>
                                    {this.registration(error)}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state => state)(Navigation));