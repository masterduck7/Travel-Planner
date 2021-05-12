import React, { Component } from "react";
import axios from 'axios';
import Calendar from '../Components/Calendar';
import moment from 'moment'
import NavBar from '../Components/NavBar'
import CryptoJS from "crypto-js";

export default class CalendarView extends Component {
    constructor(props){
        super(props)
        this.state = {
            apiURL: "http://localhost:3000/",
            token: localStorage.getItem('token'),
            user_id: this.decrypt(localStorage.getItem('user_id')),
            trips: []
        }
    }

    decrypt(value){
        if (value) {
            var bytes  = CryptoJS.AES.decrypt(value.toString(), process.env.REACT_APP_HASH);
            var response = bytes.toString(CryptoJS.enc.Utf8);
            return response    
        }else{
            return null
        }
    }
    
    componentDidMount(){
        axios.get(`${this.state.apiURL}trips_user?userID=${this.state.user_id}`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    let tripsData = []
                    res.data.forEach(trip => {
                        tripsData.push({
                            "start": moment(trip.start_date).add(0, 'days'),
                            "end": moment(trip.end_date).add(1, 'days'),
                            "title": trip.destination
                        })
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