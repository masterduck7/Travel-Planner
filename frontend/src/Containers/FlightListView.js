import React, { Component } from "react";
import axios from 'axios';
import FlightList from '../Components/FlightList';
import NavBar from '../Components/NavBar'

export default class FlightListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            flights: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/flights/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let flightdata = []
                    res.data.forEach(flight => {
                        if (Number(this.props.match.params.tripID) === flight.trip) {
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