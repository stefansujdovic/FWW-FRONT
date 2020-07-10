import { axios } from "../helpers";

class Calendar extends React.Component {

    state = {
        text: '',
        scheduleEvents: [],
        editData: '',
        editText: '',
        idEvent: Number
    }

    componentDidMount = async () => {
        let today, currentYear, currentMonth;
        today = new Date();
        currentMonth = today.getMonth();
        currentYear = today.getFullYear();
        this.showCalendar(currentMonth, currentYear);

        const res = await axios.get('all-events').then(res => res.data);

        res.map(el => {
            if (document.getElementById(el.idEvent)) {
                document.getElementById(el.idEvent).style.color = 'red'
            }
        })
        
        this.setState({ scheduleEvents: res });
    
    }


    openModal = async (event) => {
        let id = event.target.id;

        const { scheduleEvents } = this.state;

        let data;

        scheduleEvents.forEach(el => {
            if (el.idEvent == id) {
                data = el;
            }
        })

        await this.setState({ editData: data, idEvent: id })

        if (data) {
            $(`#editModal`).modal('show');
        } else {
            $(`#eventModal`).modal('show');
        }
    }


    handleChange = event => {
        this.setState({ text: event.target.value })
    }

    handleChangeEdit = event => {
        this.setState({ editText: event.target.value })
    }

    sumbit = async (event) => {
        event.preventDefault();

        const { text, idEvent } = this.state;

        const { user } = this.props;

        try {
            await axios.post(`/add-event/${user.user._id}`, { text, idEvent }, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }).then(res => res.data);
            window.location.reload();
        } catch (err) {
            alert('greska ')
        }
    }

    sumbitEdit = async (event, data) => {
        event.preventDefault();

        const { editText } = this.state;

        const { user } = this.props;

        try {
            await axios.put(`/edit-event/${data._id}/${user.user._id}`, { text: editText }, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }).then(res => res.data);
            window.location.reload();
        } catch (err) {
            alert('Error!')
        }
    }

    removeEvent = async (event,data) => {
        
        event.preventDefault();

        const { user } = this.props;
        try {
            await axios.delete(`/remove-event/${data._id}/${user.user._id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }).then(res => res.data);
            window.location.reload();
        } catch (err) {
            alert('Error')
        }
    }


    modal = () => {
        return (
            <div className="modal fade" id="eventModal" tabIndex="-1" role="dialog" aria-labelledby="eventModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eventModal">Set Event</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" onChange={this.handleChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={this.sumbit} type="button" className="btn btn-success">Add Event</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    modalEdit = (data) => {
        return (
            <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModal">Edit the Event</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" value={this.state.editText || data.text} className="form-control" onChange={this.handleChangeEdit} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={(e) => this.removeEvent(e, data)} className="btn btn-danger" data-dismiss="modal">Delete Event</button>
                            <button onClick={(e) => this.sumbitEdit(e, data)} type="button" className="btn btn-success">Edit Event</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    showCalendar(month, year) {

        let cell, cellText;

        let today = new Date();

        let monthAndYear = document.getElementById("monthAndYear");

        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let firstDay = (new Date(year, month)).getDay();

        let tbl = document.getElementById("calendar-body"); // body of the calendar

        // clearing all previous cells
        tbl.innerHTML = "";

        // filing data about month and in the page via DOM.
        monthAndYear.innerHTML = months[month] + " " + year;


        // creating all cells
        let date = 1;
        for (let i = 0; i < 6; i++) {
            // creates a table row
            let row = document.createElement("tr");

            //creating individual cells, filing them up with data.
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    cell = document.createElement("td");
                    cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > this.daysInMonth(month, year)) {
                    break;
                }

                else {
                    cell = document.createElement("td");
                    cellText = document.createTextNode(date);
                    cell.setAttribute("id", date);
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add("bg-info");
                    } // color today's date
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }


            }
            tbl.appendChild(row); // appending each row into calendar body.
        }

    }

    daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    render() {
        const { scheduleEvents, editData } = this.state;
        return (
            <div className="container col-sm-4 col-md-7 col-lg-4 mt-5">
                <div style={{ width: 'fit-content' }} className="card">
                    <h3 className="card-header" id="monthAndYear"></h3>
                    <table className="table table-bordered table-responsive-sm" id="calendar">
                        <thead>
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>

                        <tbody onClick={this.openModal} id="calendar-body">
                        </tbody>
                    </table>
                    <br />
                </div>
                {this.modal()}
                {editData && this.modalEdit(editData)}

                <div className="card">
                    {scheduleEvents.map((el, i) => {
                        return <div key={i}>
                            Day - {el.idEvent} : {el.text}
                        </div>
                    })}

                </div>

            </div>
        )
    }
}

export default Calendar;


