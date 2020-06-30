import React, { Component } from "react";
import axios from 'axios';
import ActivityList from '../Components/ActivityList';
import NavBar from '../Components/NavBar'

export default class ActivityListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            activities: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://travelplanner.lpsoftware.space/api/activities/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    let activityData = []
                    res.data.forEach(activity => {
                        if (Number(this.props.match.params.cityID) === Number(activity.cityID)) {
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