import React, { Component } from "react";
import axios from 'axios';
import TripList from '../Components/TripList';
import NavBar from '../Components/NavBar'
import CryptoJS from "crypto-js";

export default class TripListPastView extends Component {
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
        axios.get(`${this.state.apiURL}trips_status_user?userID=${this.state.user_id}&status=Active`,{
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