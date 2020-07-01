import React, { Component } from "react";
import NavBar from '../Components/NavBar'
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { Table } from 'antd';
import { Icon, Grid, Statistic } from 'semantic-ui-react';

export default class HomeView extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id'),
            user_logged: localStorage.getItem('user_logged'),
            nextTrips : [],
            number_countries: 0,
            number_trips : 0,
            number_flights : 0,
            number_cities : 0,
            number_hotel_nights : 0,
            number_activities : 0,
            total_city_cost : 0,
            total_activities : 0, 
            total_hotels : 0,
            total_flights : 0,
            totalYear: 0,
            badge_total_year: 'USD'
        }
    }

    componentDidMount(){
        // GET THIS YEAR TRIP DETAILS
        axios.get(`http://travelplanner.lpsoftware.space/api/trips/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    let countryData = {}
                    let nextTrips = []
                    let number_trips = 0
                    let number_flights = 0
                    let number_cities = 0
                    let number_hotel_nights = 0
                    let number_activities = 0
                    let total_city_cost = 0
                    let total_activities = 0
                    let total_hotels = 0
                    let total_flights = 0
                    res.data.forEach(trip => {
                        if ( Number(trip.userID) === Number(this.state.user_id) && (moment(trip.start_date).fromNow()).includes("en") && nextTrips.length < 7  && trip.status === "Active") {
                            nextTrips.push(
                                {
                                    'destination': trip.destination,
                                    'start_date': trip.start_date,
                                    'end_date': trip.end_date,
                                    'trip_id': trip.id
                                }
                            )
                        }
                        if ( Number(trip.userID) === Number(this.state.user_id) && moment(trip.start_date).format('YYYY') === moment().format('YYYY')) {
                            number_trips = Number(number_trips) + 1
                            trip.flights.forEach(flight => {
                                number_flights = Number(number_flights) + 1
                                total_flights = Number(total_flights) + Number(flight.price)
                            })
                            trip.cities.forEach(city => {
                                if (!countryData[city.country]) {
                                    countryData[city.country] = city.country
                                }
                                number_cities = Number(number_cities) + 1
                                city.hotels.forEach(hotel => {
                                    total_hotels = Number(total_hotels) + Number(hotel.total_price)
                                    let diff = moment(hotel.end_date).diff(moment(hotel.start_date), 'days')
                                    number_hotel_nights = Number(number_hotel_nights) + Number(diff)
                                });
                                city.activities.forEach(activity => {
                                    total_activities = Number(total_activities) + Number(activity.total_price)
                                    number_activities = Number(number_activities) + 1
                                });
                                city.citycosts.forEach(citycost => {
                                    total_city_cost = Number(total_city_cost) + Number(citycost.total_price)
                                });
                            });
                        }
                    });
                    this.setState({
                        number_trips : number_trips,
                        number_flights : number_flights,
                        number_cities : number_cities,
                        number_countries: Object.keys(countryData).length,
                        number_hotel_nights : number_hotel_nights,
                        number_activities : number_activities,
                        total_city_cost : total_city_cost,
                        total_activities : total_activities, 
                        total_hotels : total_hotels,
                        total_flights : total_flights,
                        nextTrips: nextTrips,
                        totalYear : total_city_cost + total_activities + total_hotels + total_flights
                    })
                }else{
                    console.log("Error in Get All Trip data")
                }
            })
    }
    render() {

        const columnNextTrips = [
            {
                title: <b>Destino</b>,
                dataIndex: 'destination',
                key: 'destination'
            },
            {
                title: <b>Fecha Inicio</b>,
                dataIndex: 'start_date',
                key: "start_date",
                defaultSortOrder: 'ascend',
                render: start_date => moment(start_date).format("DD-MM-YYYY")
            },
            {
                title: <b>Fecha Fin</b>,
                dataIndex: 'end_date',
                key: "end_date",
                render: end_date => moment(end_date).format("DD-MM-YYYY"),
            },
            {
                title: <b>Informacion</b>,
                dataIndex: 'trip_id',
                key: "trip_id",
                render: trip_id => <Link to = {`/trips/${trip_id}`}>Ir a detalles</Link>,
            },
        ]

        return  (
            <div>
                <NavBar/>
                <Grid style={{margin: "1%", marginTop: "60px"}} columns={2} divided >
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <h1 style={{textAlign: 'center', marginTop: 20}}>Bienvenido {this.state.user_logged}</h1>
                            <Statistic.Group style={{marginTop: 30}} size={"tiny"} widths='1' color="grey" >
                                <Statistic>
                                    <Statistic.Value>
                                        {this.state.badge_total_year} {this.state.totalYear}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Total gastado este año</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <br /><br /><br /><br />
                            <Statistic.Group size={"tiny"} widths='3' color="grey" >
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='world' /> {this.state.number_trips}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Viajes</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        {this.state.number_countries}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Paises</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        {this.state.number_cities}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Ciudades</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <br /><br /><br /><br />
                            <Statistic.Group size={"tiny"} widths='2' color="grey" >
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='hotel' /> {this.state.number_hotel_nights}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Noches de hotel</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='futbol' /> {this.state.number_activities}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Actividades</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <h1 style={{textAlign: 'center', marginTop: 20}}>Siguientes 7 viajes</h1>
                            <Table style={{marginTop: 30}} pagination={false} columns={columnNextTrips} dataSource={this.state.nextTrips} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};