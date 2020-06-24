import React, { Component } from "react";
import axios from 'axios';
import Calendar from '../Components/Calendar';
import moment from 'moment'
import CustomLayout from '../Components/CustomLayout'

export default class CalendarView extends Component {
    constructor(props){
        super(props)
        this.state = {
            user_id: localStorage.getItem('user_id'),
            trips: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/trips/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let tripsData = []
                    res.data.forEach(trip => {
                        if (trip.user.toString() === this.state.user_id) {
                            tripsData.push({
                                "start": moment(trip.start_date).add(0, 'days'),
                                "end": moment(trip.end_date).add(1, 'days'),
                                "title": trip.destination
                            })
                        }
                    });
                    this.setState({
                        trips: tripsData
                    })    
                }else{
                    console.log("Error in Get Trips data")
                }
            })
    }

    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '3'}} />
                <Calendar data={{trips: this.state.trips}}/>
            </div>
        )
    }
};