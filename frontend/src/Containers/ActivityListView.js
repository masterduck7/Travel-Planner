import React, { Component } from "react";
import axios from 'axios';
import ActivityList from '../Components/ActivityList';
import NavBar from '../Components/NavBar'

export default class ActivityListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            activities: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/activities/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let activityData = []
                    res.data.forEach(activity => {
                        if (Number(this.props.match.params.cityID) === activity.city) {
                            activityData.push(activity)
                        }
                    });
                    this.setState({
                        activities: activityData
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