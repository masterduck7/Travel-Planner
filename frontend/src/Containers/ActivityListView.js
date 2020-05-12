import React, { Component } from "react";
import axios from 'axios';
import ActivityList from '../Components/ActivityList';
import CustomLayout from '../Components/CustomLayout'

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
                    this.setState({
                        activities: res.data
                    })    
                }else{
                    this.setState({
                        activities: []
                    }) 
                }
            })
    }

    render() {
        return  (
            <div>
                <CustomLayout />
                <ActivityList data={{ activities: this.state.activities, tripID: this.props.location.state.tripID }}/>
            </div>
        )
    }
};