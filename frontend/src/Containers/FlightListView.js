import React, { Component } from "react";
import axios from 'axios';
import FlightList from '../Components/FlightList';
import NavBar from '../Components/NavBar'

export default class FlightListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            apiURL: "http://localhost:3000/",
            token: localStorage.getItem('token'),
            flights: []
        }
    }
    
    componentDidMount(){
        axios.get(`${this.state.apiURL}flights_trip?tripID=${this.props.match.params.tripID}`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        flights: res.data
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