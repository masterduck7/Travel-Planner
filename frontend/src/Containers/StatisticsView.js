import React, { Component } from "react";
import axios from 'axios';
import CustomLayout from '../Components/CustomLayout'

export default class StatisticsView extends Component {

    constructor(props){
        super(props)
        this.state = {
            tripFlights: {},
            cityData: {}
        }
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/trips/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let tripFlightsData = {}
                    res.data.forEach(trip => {
                        let selectedFlights = 0
                        let totalFlights = 0
                        trip.flights.forEach(flight => {
                            selectedFlights = Number(selectedFlights) + Number(flight.price)
                            totalFlights = Number(totalFlights) + 1
                        });
                        let tripFlights = {'number_flights': totalFlights, 'price_flights': selectedFlights}
                        if (!tripFlightsData[trip.destination]) {
                            tripFlightsData[trip.destination] = tripFlights
                        } else {
                            let oldNumber = tripFlightsData[trip.destination].number_flights
                            let oldPrice = tripFlightsData[trip.destination].price_flights
                            tripFlightsData[trip.destination] = {'number_flights': totalFlights + oldNumber, 'price_flights': selectedFlights + oldPrice }
                        }
                    });
                    console.log(tripFlightsData)
                    this.setState({
                        tripFlights: tripFlightsData
                    })
                }else{
                    console.log("Error in Get Flights of Trip data")
                }
            })
        axios.get(`http://127.0.0.1:8000/cities/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let cityData = {}
                    res.data.forEach(city => {
                        let selectedHotels = 0
                        let selectedActivities = 0
                        let totalHotels = 0
                        let totalActivities = 0
                        let totalCityCost = 0
                        city.hotels.forEach(hotel => {
                            selectedHotels = Number(selectedHotels) + 1
                            totalHotels = Number(totalHotels) + Number(hotel.total_price)
                        });
                        city.activities.forEach(activity => {
                            selectedActivities = Number(selectedActivities) + 1
                            totalActivities = Number(totalActivities) + Number(activity.total_price)
                        });
                        city.costs.forEach(cost => {
                            totalCityCost = Number(totalCityCost) + Number(cost.total_price)
                        });
                        let selectedCity = {'number_hotels': selectedHotels, 'price_hotels': totalHotels, 
                        'number_activities': selectedActivities, 'price_activites': totalActivities, 'city_cost': totalCityCost }
                        if (!cityData[city.name]) {
                            cityData[city.name] = selectedCity
                        } else {
                            let oldSelectedHotels = cityData[city.name].number_hotels
                            let oldPriceHotels = cityData[city.name].price_hotels
                            let oldSelectedActivities = cityData[city.name].number_activities
                            let oldPriceActivities = cityData[city.name].price_activites
                            let oldCityCost = cityData[city.name].city_cost
                            cityData[city.name] = {'number_hotels': selectedHotels + oldSelectedHotels, 
                            'price_hotels': totalHotels + oldPriceHotels, 'number_activities': selectedActivities + oldSelectedActivities, 
                            'price_activites': totalActivities + oldPriceActivities, 'city_cost': totalCityCost + oldCityCost }
                        }
                    });
                    console.log(cityData)
                    this.setState({
                        cityData: cityData
                    })    
                }else{
                    console.log("Error in Get Cost City data")
                }
            })
    }

    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '3'}} />
                <h1>Estadisticas</h1>
            </div>
        )
    }
};