import React, { Component } from "react";
import axios from 'axios';
import CityList from '../Components/CityList';
import NavBar from '../Components/NavBar'

export default class CityListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            cities: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/cities/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let citiesdata = []
                    res.data.forEach(city => {
                        if (Number(this.props.match.params.tripID) === city.trip) {
                            citiesdata.push(city)
                        }
                    });
                    this.setState({
                        cities: citiesdata
                    }) 
                }else{
                    console.log("Error in Get City data")
                }
            })
    }

    render() {
        return  (
            <div>
                <NavBar data={{tab: '2'}} />
                <CityList data={{ cities: this.state.cities, tripID: this.props.match.params.tripID }}/>
            </div>
        )
    }
};