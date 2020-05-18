import React, { Component } from "react";
import axios from 'axios';
import TripList from '../Components/TripList';
import CustomLayout from '../Components/CustomLayout'

export default class TripListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            trips: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/trips/`)
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        trips: res.data
                    })    
                }else{
                    console.log("Error in Get Trips data")
                }
            })
    }

    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '2'}} />
                <TripList data={{trips: this.state.trips, tab: '0'}}/>
            </div>
        )
    }
};