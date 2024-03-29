import React, { Component } from "react";
import axios from 'axios';
import CostList from '../Components/CostList';
import NavBar from '../Components/NavBar'

export default class CityCostView extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            costs: []
        }
    }
    
    componentDidMount(){
        axios.get(`https://travelplanner.lpsoftware.space/api/costs_city?cityID=${this.props.match.params.cityID}`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        costs: res.data
                    })
                }else{
                    console.log("Error in Get City Costs data")
                }
            })
    }

    render() {
        return  (
            <div>
                <NavBar/>
                <CostList data={{ costs: this.state.costs, tripID: this.props.match.params.tripID, cityID: this.props.match.params.cityID }}/>
            </div>
        )
    }
};