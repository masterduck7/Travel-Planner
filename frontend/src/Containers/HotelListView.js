import React, { Component } from "react";
import axios from 'axios';
import HotelList from '../Components/HotelList';
import NavBar from '../Components/NavBar'

export default class HotelListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            apiURL: "http://localhost:3000/",
            token: localStorage.getItem('token'),
            hotels: []
        }
    }
    
    componentDidMount(){
        axios.get(`${this.state.apiURL}hotels_city?cityID=${this.props.match.params.cityID}`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        hotels: res.data
                    })
                }else{
                    console.log("Error in Get Hotel data")
                }
            })
    }

    render() {
        return  (
            <div>
                <NavBar/>
                <HotelList data={{ hotels: this.state.hotels, tripID: this.props.match.params.tripID, cityID: this.props.match.params.cityID }}/>
            </div>
        )
    }
};