import React, { Component } from "react";
import axios from 'axios';
import TripList from '../Components/TripList';
import NavBar from '../Components/NavBar'

export default class TripListPastView extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id'),
            trips: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://travelplanner.lpsoftware.space/api/trips_status/Cancelled`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    const data = res.data
                    let filterData = []
                    data.forEach(trip => {
                        if (trip.userID.toString() === this.state.user_id.toString()) {
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
                <NavBar/>
                <TripList data={{trips: this.state.trips, tab: [false, false, true, false], type: 'Viajes cancelados'}}/>
            </div>
        )
    }
};