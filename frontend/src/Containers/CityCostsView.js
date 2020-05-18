import React, { Component } from "react";
import axios from 'axios';
import CostList from '../Components/CostList';
import CustomLayout from '../Components/CustomLayout'

export default class CityCostView extends Component {
    constructor(props){
        super(props)
        this.state = {
            costs: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/costs/`)
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        costs: res.data
                    })    
                }else{
                    this.setState({
                        costs: []
                    }) 
                }
            })
    }

    render() {
        return  (
            <div>
                <CustomLayout />
                <CostList data={{ costs: this.state.costs, tripID: this.props.location.state.tripID, cityID: this.props.location.state.cityID }}/>
            </div>
        )
    }
};