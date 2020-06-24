import React, { Component } from "react";
import axios from 'axios';
import HotelList from '../Components/HotelList';
import NavBar from '../Components/NavBar'

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
                    let hotelData = []
                    res.data.forEach(hotel => {
                        if (Number(this.props.match.params.cityID) === hotel.city) {
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
                <NavBar data={{tab: '2'}} />
                <HotelList data={{ hotels: this.state.hotels, tripID: this.props.match.params.tripID, cityID: this.props.match.params.cityID }}/>
            </div>
        )
    }
};