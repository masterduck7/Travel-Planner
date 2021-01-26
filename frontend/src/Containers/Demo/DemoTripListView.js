import React, { Component } from "react";
import DemoTripList from '../../Components/Demo/DemoTripList';
import DemoNavBar from '../../Components/Demo/DemoNavBar'

export default class DemoTripListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            trips: [
                {destination: 'Paris', start_date: '2021-01-01', end_date: '2021-01-08', trip_id: 1, planning_file: 'file.xlsx', status: 'Cancelled'},
                {destination: 'Barcelona', start_date: '2021-02-01', end_date: '2021-02-08', trip_id: 1, planning_file: 'file.xlsx', status: 'Cancelled'},
                {destination: 'Madrid', start_date: '2021-03-01', end_date: '2021-03-08', trip_id: 1, planning_file: 'file.xlsx', status: 'Active'},
                {destination: 'Reykjavik', start_date: '2021-04-01', end_date: '2021-04-08', trip_id: 1, planning_file: 'file.xlsx', status: 'Active'},
                {destination: 'Buenos Aires', start_date: '2021-05-01', end_date: '2021-05-08', trip_id: 1, planning_file: 'file.xlsx', status: 'Active'},
                {destination: 'New York', start_date: '2019-06-01', end_date: '2019-06-08', trip_id: 1, planning_file: 'file.xlsx', status: 'Past'},
                {destination: 'Santiago', start_date: '2019-07-01', end_date: '2019-07-08', trip_id: 1, planning_file: 'file.xlsx', status: 'Past'}
            ]
        }
    }

    render() {
        return  (
            <div>
                <DemoNavBar/>
                <DemoTripList data={{trips: this.state.trips, type: "Todos los viajes"}}/>
            </div>
        )
    }
};