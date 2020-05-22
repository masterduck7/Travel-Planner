import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default class ActivityList extends Component {
    render() {
        return (
            <div className="App">
                <h1 style={{textAlign: 'center', marginTop: 20}}>Calendario</h1>
                <Calendar
                    localizer={localizer}
                    defaultView="month"
                    views={['month']}
                    events={this.props.data.trips}
                    style={{ marginTop: 30, marginLeft: "1%", marginRight: "1%", height: "70vh" }}
                />
            </div>
        );
    }
}