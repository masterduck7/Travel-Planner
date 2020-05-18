import React, { Component } from "react";
import { Col, Icon, Menu, Row, Button } from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CustomLayout from '../Components/CustomLayout'

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
            totalHotels_paid : 0,
            totalHotels_not_paid : 0
        }
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/flights/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let selectedFlights = 0
                    let totalFlights = 0
                    res.data.forEach(flight => {
                        if (flight.trip === this.props.location.state.tripID) {
                            selectedFlights = Number(selectedFlights) + Number(flight.price)
                            totalFlights = Number(totalFlights) + 1
                        }
                    });
                    this.setState({
                        flights_costs: selectedFlights,
                        number_flights: totalFlights
                    })    
                }else{
                    console.log("Error get data")
                }
            })
        axios.get(`http://127.0.0.1:8000/cities/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let selectedCities = 0
                    let selectedHotels = 0
                    let selectedActivities = 0
                    let totalCityCost = 0
                    let totalHotels = 0
                    let totalHotels_paid = 0
                    let totalHotels_not_paid = 0
                    let totalActivities = 0
                    let totalActivities_paid = 0
                    let totalActivities_not_paid = 0
                    res.data.forEach(city => {
                        if (city.trip === this.props.location.state.tripID) {
                            selectedCities = Number(selectedCities) + 1
                            city.hotels.forEach(hotel => {
                                selectedHotels = Number(selectedHotels) + 1
                                totalHotels = Number(totalHotels) + Number(hotel.total_price)
                                totalHotels_paid = Number(totalHotels) + Number(hotel.amount_paid)
                                totalHotels_not_paid = Number(totalHotels) + Number(hotel.amount_not_paid)
                            });
                            city.activities.forEach(activity => {
                                selectedActivities = Number(selectedActivities) + 1
                                totalActivities = Number(totalActivities) + Number(activity.total_price)
                                totalActivities_paid = Number(totalActivities_paid) + Number(activity.amount_paid)
                                totalActivities_not_paid = Number(totalActivities_not_paid) + Number(activity.amount_not_paid)
                            });
                            city.costs.forEach(cost => {
                                totalCityCost = Number(totalCityCost) + Number(cost.total_price)
                            });
                        }
                    });
                    this.setState({
                        city_costs: totalCityCost,
                        number_cities: selectedCities,
                        number_hotels: selectedHotels,
                        number_activities: selectedActivities,
                        activities_costs: totalActivities,
                        totalActivities_paid: totalActivities_paid,
                        totalActivities_not_paid: totalActivities_not_paid,
                        hotels_costs: totalHotels,
                        totalHotels_paid: totalHotels_paid,
                        totalHotels_not_paid: totalHotels_not_paid
                    })    
                }else{
                    console.log("Error get data")
                }
            })
    }

    render() {
        return  (
            <div>
                <CustomLayout />
                <Row>
                <Col xs={4} sm={6} md={6} lg={86} xl={4}>
                    <div style={{width: 200}}>
                        <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                        >
                            <Menu.Item key="1">
                                <Icon type="rollback" />
                                <span>Volver</span>
                                <Link to={`/trips/${this.props.location.state.tripID}`}></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <h1>Costos</h1>
                    <p>
                        <a>Numero de vuelos: {this.state.number_flights}</a>
                        <br />
                        <a>Total gastado en vuelos: {this.state.flights_costs}</a>   
                        <br />
                        <a>Numero de ciudades: {this.state.number_cities}</a>
                        <br />
                        <a>Gastos extras en ciudades: {this.state.city_costs}</a>                        
                        <br />
                        <a>Numero de hoteles: {this.state.number_hotels}</a>
                        <br />
                        <a>Total precio hoteles: {this.state.hotels_costs}</a>
                        <br />
                        <a>Hotel pagado/No pagado: {this.state.totalHotels_paid}/{this.state.totalHotels_not_paid}</a>
                        <br />
                        <a>Numero de actividades: {this.state.number_activities}</a>
                        <br />
                        <a>Total precio actividades: {this.state.activities_costs}</a>
                        <br />
                        <a>Actividades pagado/No pagado: {this.state.totalActivities_paid}/{this.state.totalActivities_not_paid}</a>
                    </p>
                    <Button>Guardar costos ciudad</Button>
                    <Button>Guardar costos totales</Button>
                </Col>
                </Row>
            </div>
        )
    }
};