import React, { Component } from "react";
import axios from 'axios';
import TripList from '../Components/TripList';
import NavBar from '../Components/NavBar'

export default class TripListPastView extends Component {
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
                    const data = res.data
                    let filterData = []
                    data.forEach(trip => {
                        if (trip.status === "Cancelled" && trip.user.toString() === this.state.user_id) {
                            filterData.push(trip)
                        }
                    });
                    this.setState({
                        trips: filterData
                    })
                }else{
                    console.log("Error in Get Cancelled Trips data")
                }
            })
    }

    render() {
        return  (
            <div>
                <NavBar data={{tab: '2'}} />
                <TripList data={{trips: this.state.trips, tab: [false, false, true, false], type: 'Viajes cancelados'}}/>
            </div>
        )
    }
};