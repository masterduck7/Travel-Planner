import React, { Component } from "react";
import axios from 'axios';
import TripList from '../Components/TripList';

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
                    this.setState({
                        trips: []
                    }) 
                }
            })
    }

    render() {
        return  (
            <div>
                <TripList data={this.state.trips}/>
            </div>
        )
    }
};