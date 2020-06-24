import React, { Component } from "react";
import axios from 'axios';
import CostList from '../Components/CostList';
import NavBar from '../Components/NavBar'

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
                    let costData = []
                    res.data.forEach(cost => {
                        if (Number(this.props.match.params.cityID) === cost.city) {
                            costData.push(cost)
                        }
                    });
                    this.setState({
                        costs: costData
                    })
                }else{
                    console.log("Error in Get City Costs data")
                }
            })
    }

    render() {
        return  (
            <div>
                <NavBar data={{tab: '2'}} />
                <CostList data={{ costs: this.state.costs, tripID: this.props.match.params.tripID, cityID: this.props.match.params.cityID }}/>
            </div>
        )
    }
};