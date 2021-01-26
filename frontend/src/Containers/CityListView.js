import React, { Component } from "react";
import axios from 'axios';
import CityList from '../Components/CityList';
import NavBar from '../Components/NavBar'

export default class CityListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            cities: []
        }
    }
    
    componentDidMount(){
        axios.get(`https://travelplanner.lpsoftware.space/api/cities_trip?tripID=${this.props.match.params.tripID}`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        cities: res.data
                    }) 
                }else{
                    console.log("Error in Get City data")
                }
            })
    }

    render() {
        return  (
            <div>
                <NavBar/>
                <CityList data={{ cities: this.state.cities, tripID: this.props.match.params.tripID }}/>
            </div>
        )
    }
};