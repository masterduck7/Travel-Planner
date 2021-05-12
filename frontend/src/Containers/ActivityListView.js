import React, { Component } from "react";
import axios from 'axios';
import ActivityList from '../Components/ActivityList';
import NavBar from '../Components/NavBar'

export default class ActivityListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            apiURL: "http://localhost:3000/",
            token: localStorage.getItem('token'),
            activities: []
        }
    }
    
    componentDidMount(){
        axios.get(`${this.state.apiURL}activities_city?cityID=${this.props.match.params.cityID}`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        activities: res.data
                    })
                }else{
                    console.log("Error in Get Activity data")
                }
            })
    }

    render() {
        return  (
            <div>
                <NavBar/>
                <ActivityList data={{ activities: this.state.activities, tripID: this.props.match.params.tripID, cityID: this.props.match.params.cityID }}/>
            </div>
        )
    }
};