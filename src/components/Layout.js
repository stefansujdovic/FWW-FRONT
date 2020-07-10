import { Component } from "react";
import { Navigation } from ".";

class Layout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className="container">
                <Navigation />
                {children}


                <style global jsx>
                    {`
           
                    .auth_container div {
                        position: relative;
                    }

                    .auth_container div input {
                        padding-left: 50px;
                    }

                    .auth_container div i {
                        position: absolute;
                        left: 17px;
                        top: 5px;
                        font-size: 26px;
                    }

                    .navigation_container {
                        background: #881313;
                    }

                    .bg_modal_content {
                        background-color:#091540;
                    }

                    .view_password_eye {
                        float: right;
                        margin-top: -35px;
                        margin-right: 33px;
                        position: relative !important;
                        z-index: 2;
                    }

                `}
                </style>
            </div>
        )
    }
}


export default Layout;