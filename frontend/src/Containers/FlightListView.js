import React, { Component } from "react";
import axios from 'axios';
import FlightList from '../Components/FlightList';
import NavBar from '../Components/NavBar'

export default class FlightListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            flights: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://travelplanner.lpsoftware.space/api/flights/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    let flightdata = []
                    res.data.forEach(flight => {
                        if (Number(this.props.match.params.tripID) === flight.tripID) {
                            flightdata.push(flight)
                        }
                    });
                    this.setState({
                        flights: flightdata
                    }) 
                }else{
                    console.log("Error in Get Flight data")
                }
            })
    }

    render() {
        return  (
            <div>
                <NavBar/>
                <FlightList data={{ flights: this.state.flights, tripID: this.props.match.params.tripID }}/>
            </div>
        )
    }
};