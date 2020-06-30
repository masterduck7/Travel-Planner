import React, { Component } from "react";
import axios from 'axios';
import Calendar from '../Components/Calendar';
import moment from 'moment'
import NavBar from '../Components/NavBar'

export default class CalendarView extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id'),
            trips: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://travelplanner.lpsoftware.space/api/trips/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    let tripsData = []
                    res.data.forEach(trip => {
                        if (Number(trip.userID) === Number(this.state.user_id)) {
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
                <NavBar/>
                <Calendar data={{trips: this.state.trips}}/>
            </div>
        )
    }
};