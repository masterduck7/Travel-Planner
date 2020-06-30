import React, { Component } from "react";
import axios from 'axios';
import HotelList from '../Components/HotelList';
import NavBar from '../Components/NavBar'

export default class HotelListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            hotels: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://travelplanner.lpsoftware.space/api/hotels/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    let hotelData = []
                    res.data.forEach(hotel => {
                        if (Number(this.props.match.params.cityID) === Number(hotel.cityID)) {
                            hotelData.push(hotel)
                        }
                    });
                    this.setState({
                        hotels: hotelData
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