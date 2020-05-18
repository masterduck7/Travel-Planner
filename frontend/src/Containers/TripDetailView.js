import React, { Component } from "react";
import axios from 'axios';
import TripDetail from '../Components/TripDetail'


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
                this.setState({
                    trip: res.data
                })
            })
    }
    render() {
        return  (
            <div>
                <TripDetail trip={this.state.trip} />
            </div>
        )
    }
}