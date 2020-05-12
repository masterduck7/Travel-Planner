import React, { Component } from "react";
import axios from 'axios';
import CityList from '../Components/CityList';
import CustomLayout from '../Components/CustomLayout'

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
                    this.setState({
                        cities: res.data
                    })    
                }else{
                    this.setState({
                        cities: []
                    }) 
                }
            })
    }

    render() {
        return  (
            <div>
                <CustomLayout />
                <CityList data={{ cities: this.state.cities, tripID: this.props.location.state.tripID }}/>
            </div>
        )
    }
};