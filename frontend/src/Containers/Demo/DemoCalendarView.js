import React, { Component } from "react";
import Calendar from '../../Components/Calendar';
import moment from 'moment'
import DemoNavBar from '../../Components/Demo/DemoNavBar'

export default class DemoCalendarView extends Component {
    constructor(props){
        super(props)
        this.state = {
            trips: [
                {title: 'Paris', start: moment('2021-01-01').add(0, 'days'), end: moment('2021-01-08').add(1, 'days')},
                {title: 'Barcelona', start: moment('2021-02-01').add(0, 'days'), end: moment('2021-02-08').add(1, 'days')},
                {title: 'Madrid', start: moment('2021-03-01').add(0, 'days'), end: moment('2021-03-08').add(1, 'days')},
                {title: 'Reykjavik', start: moment('2021-04-01').add(0, 'days'), end: moment('2021-04-08').add(1, 'days')},
                {title: 'Buenos Aires', start: moment('2021-05-01').add(0, 'days'), end: moment('2021-05-08').add(1, 'days')},
                {title: 'New York', start: moment('2021-06-01').add(0, 'days'), end: moment('2021-06-08').add(1, 'days')},
                {title: 'Santiago', start: moment('2021-07-01').add(0, 'days'), end: moment('2021-07-08').add(1, 'days')}
            ]
        }
    }

    render() {
        return  (
            <div>
                <DemoNavBar/>
                <Calendar data={{trips: this.state.trips}}/>
            </div>
        )
    }
};