import React, { Component } from "react";
import axios from 'axios';
import HotelList from '../Components/HotelList';
import CustomLayout from '../Components/CustomLayout'

export default class HotelListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            hotels: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/hotels/`)
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        hotels: res.data
                    })    
                }else{
                    this.setState({
                        hotels: []
                    }) 
                }
            })
    }

    render() {
        return  (
            <div>
                <CustomLayout />
                <HotelList data={{ hotels: this.state.hotels, tripID: this.props.location.state.tripID }}/>
            </div>
        )
    }
};