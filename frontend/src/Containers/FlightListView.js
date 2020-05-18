import React, { Component } from "react";
import axios from 'axios';
import FlightList from '../Components/FlightList';
import CustomLayout from '../Components/CustomLayout'

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
                    this.setState({
                        flights: res.data
                    })    
                }else{
                    this.setState({
                        flights: []
                    }) 
                }
            })
    }

    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '2'}} />
                <FlightList data={{ flights: this.state.flights, tripID: this.props.match.params.tripID }}/>
            </div>
        )
    }
};