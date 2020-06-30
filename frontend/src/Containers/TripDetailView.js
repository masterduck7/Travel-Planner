import React, { Component } from "react";
import axios from 'axios';
import TripDetail from '../Components/TripDetail'
import NavBar from '../Components/NavBar'

export default class TripDetailView extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            trip: []
        }
    }
    
    componentDidMount(){
        const tripID = this.props.match.params.tripID;
        axios.get(`http://travelplanner.lpsoftware.space/api/trips/${tripID}/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        trip: res.data
                    })
                }else{
                    console.log("Error in Get Detail Trips data")
                }
            })
    }
    render() {
        return  (
            <div>
                <NavBar/>
                <TripDetail trip={this.state.trip} />
            </div>
        )
    }
}