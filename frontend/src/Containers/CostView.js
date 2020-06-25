import React, { Component } from "react";
import { Button, Grid, Icon, Statistic } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/NavBar'

export default class CostView extends Component {

    constructor(props){
        super(props)
        this.state = {
            number_flights: 0,
            number_cities: 0,
            number_hotels : 0,
            number_activities : 0,
            flights_costs: 0,
            hotels_costs: 0,
            activities_costs: 0,
            city_costs: 0,
            totalHotels_not_paid : 0,
            totalActivities_not_paid : 0
        }
    }

    componentDidMount(){

        axios.get(`http://127.0.0.1:8000/trips/${this.props.match.params.tripID}/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let selectedFlights = 0
                    let totalFlights = 0
                    let selectedCities = 0
                    let selectedHotels = 0
                    let selectedActivities = 0
                    let totalCityCost = 0
                    let totalHotels = 0
                    let totalHotels_not_paid = 0
                    let totalActivities = 0
                    let totalActivities_not_paid = 0
                    console.log(res.data)
                    res.data.flights.forEach(flight => {
                        selectedFlights = Number(selectedFlights) + Number(flight.price)
                        totalFlights = Number(totalFlights) + 1
                    });
                    res.data.cities.forEach(city => {
                        selectedCities = Number(selectedCities) + 1
                        city.hotels.forEach(hotel => {
                            selectedHotels = Number(selectedHotels) + 1
                            totalHotels = Number(totalHotels) + Number(hotel.total_price)
                            totalHotels_not_paid = Number(totalHotels) + Number(hotel.amount_not_paid)
                        });
                        city.activities.forEach(activity => {
                            selectedActivities = Number(selectedActivities) + 1
                            totalActivities = Number(totalActivities) + Number(activity.total_price)
                            totalActivities_not_paid = Number(totalActivities_not_paid) + Number(activity.amount_not_paid)
                        });
                        city.costs.forEach(cost => {
                            totalCityCost = Number(totalCityCost) + Number(cost.total_price)
                        });
                    });
                    this.setState({
                        city_costs: totalCityCost,
                        number_cities: selectedCities,
                        number_hotels: selectedHotels,
                        number_activities: selectedActivities,
                        activities_costs: totalActivities,
                        totalActivities_not_paid: totalActivities_not_paid,
                        hotels_costs: totalHotels,
                        totalHotels_not_paid: totalHotels_not_paid,
                        flights_costs: selectedFlights,
                        number_flights: totalFlights
                    })
                }else{
                    console.log("Error in Get Trip Cost data")
                }
                
            })
    }

    render() {
        return  (
            <div>
                <NavBar/>
                <Button negative style={{marginLeft: "1%", marginTop: "60px", marginBottom: "1%"}}>
                    <Icon name="angle left" />
                    <Link style={{color:"white"}} to={`/trips/${this.props.match.params.tripID}`}>Volver</Link>
                </Button>
                <h1 style={{textAlign: 'center', marginTop: -20}}>Costos</h1>

                <Grid style={{margin: "1%"}} columns={2} divided >
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                        <h1 style={{textAlign: 'center', marginTop: 20}}>Gastos</h1>
                        <br />
                        <Statistic.Group size={"tiny"} widths='2' color="grey" >
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='plane' /> {this.state.number_flights}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Vuelos</Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='dollar sign' /> {this.state.flights_costs}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Gastos en vuelos</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                        <br /><br />
                        <Statistic.Group size={"tiny"} widths='2' color="grey" >
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='hotel' /> {this.state.number_hotels}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Hoteles</Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='dollar sign' /> {this.state.hotels_costs}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Gastos en hotel</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                        <br /><br />
                        <Statistic.Group size={"tiny"} widths='2' color="grey" >
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='futbol' /> {this.state.number_activities}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Actividades</Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='dollar sign' /> {this.state.activities_costs}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Gastos en actividades</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                        <br /><br />
                        <Statistic.Group size={"tiny"} widths='2' color="grey" >
                            <Statistic>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='dollar sign' /> {this.state.city_costs}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Gastos extras</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <h1 style={{textAlign: 'center', marginTop: 20}}>Por pagar</h1>
                            <br /><br />
                            <Statistic.Group size={"tiny"} widths='1' color="grey" >
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='money' /> {this.state.totalHotels_not_paid}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Hotel Por pagar</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <br /><br /><br />
                            <Statistic.Group size={"tiny"} widths='1' color="grey" >
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='money' /> {this.state.totalActivities_not_paid}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Actividades Por pagar</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};