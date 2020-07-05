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
        axios.get(`https://travelplanner.lpsoftware.space/api/trips_status_user?userID=${this.state.user_id}&status=Active`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        trips: res.data
                    })
                }else{
                    console.log("Error in Get Future Trips data")
                }
            })
    }

    render() {
        return  (
            <div>
                <NavBar/>
                <TripList data={{trips: this.state.trips, tab: [false, false, false, true], type: 'Viajes futuros'}}/>
            </div>
        )
    }
};