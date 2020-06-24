import React, { Component } from "react";
import axios from 'axios';
import TripDetail from '../Components/TripDetail'
import NavBar from '../Components/NavBar'

export default class TripDetailView extends Component {
    constructor(props){
        super(props)
        this.state = {
            trip: []
        }
    }
    
    componentDidMount(){
        const tripID = this.props.match.params.tripID;
        axios.get(`http://127.0.0.1:8000/trips/${tripID}/`)
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