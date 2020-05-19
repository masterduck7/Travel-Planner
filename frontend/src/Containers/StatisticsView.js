import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import CustomLayout from '../Components/CustomLayout'

const { getNameList } = require('country-list');

export default class StatisticsView extends Component {

    constructor(props){
        super(props)
        this.state = {
            country_list: getNameList(),
            flights: {}, //First view
            cityData: {},//Second view
            number_cities : 0, //Last View
            number_flights: 0, //Last View
            hotelNights: 0,    //Last View

        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidMount(){
        // GET FLIGHTS DETAILS
        axios.get(`http://127.0.0.1:8000/flights/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let flights = []
                    res.data.forEach(flight => {
                        let flighData = {
                            'origin': flight.origin,
                            'destination': flight.destination,
                            'date': flight.start_date,
                            'airline': flight.airline_name,
                            'price': flight.price
                        }
                        flights.push(flighData)
                    });
                    console.log(flights)
                    this.setState({
                        flights: flights,
                        number_flights: flights.length
                    })
                }else{
                    console.log("Error in Get Flights of Trip data")
                }
            })
        axios.get(`http://127.0.0.1:8000/cities/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let cityData = []
                    let TotalHotelNights = 0
                    let cities = {}
                    let avgCountryData = {}

                    let CountrySelectedHotels = 0
                    let CountryTotalHotels = 0
                    let CountrySelectedActivities = 0
                    let CountryTotalActivities = 0
                    let CountryTotalCityCost = 0
                    res.data.forEach(city => {

                        if (!cities[city.name]) {
                            cities[city.name] = city.country
                        }

                        let selectedHotels = 0
                        let totalHotels = 0
                        let hotelNights = 0
                        let selectedActivities = 0
                        let totalActivities = 0
                        let totalCityCost = 0
                        city.hotels.forEach(hotel => {
                            selectedHotels = Number(selectedHotels) + 1
                            totalHotels = Number(totalHotels) + Number(hotel.total_price)
                            let diff = moment(hotel.end_date).diff(moment(hotel.start_date), 'days')
                            hotelNights = Number(hotelNights) + Number(diff)
                        });
                        city.activities.forEach(activity => {
                            selectedActivities = Number(selectedActivities) + 1
                            totalActivities = Number(totalActivities) + Number(activity.total_price)
                        });
                        city.costs.forEach(cost => {
                            totalCityCost = Number(totalCityCost) + Number(cost.total_price)
                        });

                        let countryName = Object.keys(this.state.country_list).find(key => this.state.country_list[key] === city.country)
                        let countryNameCapitalized = this.capitalizeFirstLetter(countryName)

                        let avgHotels = Number(totalHotels/hotelNights).toFixed(2)
                        let avgActivities = Number(totalActivities/selectedActivities).toFixed(2)

                        if (selectedHotels === 0){
                            avgHotels = 0
                        }
                        if(selectedActivities === 0){
                            avgActivities = 0
                        }

                        TotalHotelNights = Number(TotalHotelNights) + Number(hotelNights)

                        if (!avgCountryData[countryNameCapitalized]) {
                            avgCountryData[countryNameCapitalized] = {
                                'number_hotels': selectedHotels, 'hotelNights': hotelNights, 'price_hotels': totalHotels, 'avgHotels': avgHotels, 
                                'number_activities': selectedActivities, 'price_activites': totalActivities, 'avgActivities': avgActivities, 
                                'city_cost': totalCityCost 
                            }
                        }else{
                            let oldSelectedHotels = avgCountryData[countryNameCapitalized].number_hotels
                            let oldHotelNights = avgCountryData[countryNameCapitalized].hotelNights
                            let oldTotalHotels = avgCountryData[countryNameCapitalized].price_hotels
                            let oldSelectedActivities = avgCountryData[countryNameCapitalized].number_activities
                            let oldTotalActivities = avgCountryData[countryNameCapitalized].price_activites
                            let oldTotalCityCost = avgCountryData[countryNameCapitalized].city_cost
                            avgCountryData[countryNameCapitalized] = {
                                'number_hotels': selectedHotels + oldSelectedHotels, 'price_hotels': totalHotels + oldTotalHotels, 
                                'hotelNights': oldHotelNights + hotelNights,
                                'avgHotels': Number((totalHotels + oldTotalHotels)/(hotelNights + oldHotelNights)).toFixed(2), 
                                'number_activities': selectedActivities + oldSelectedActivities, 'price_activites': totalActivities + oldTotalActivities, 
                                'avgActivities': Number((totalActivities + oldTotalActivities)/(selectedActivities + oldSelectedActivities)).toFixed(2), 
                                'city_cost': totalCityCost + oldTotalCityCost 
                            }
                        }

                        CountrySelectedHotels = Number(CountrySelectedHotels) + selectedHotels
                        CountryTotalHotels = Number(CountryTotalHotels) + Number(totalHotels)
                        CountrySelectedActivities = Number(CountrySelectedActivities) + selectedActivities
                        CountryTotalActivities = Number(CountryTotalActivities) + Number(totalActivities)
                        CountryTotalCityCost = Number(CountryTotalCityCost) + Number(totalCityCost)
                        

                        let selectedCity = {'country': countryNameCapitalized, 'trip_id': city.trip, 'number_hotels': selectedHotels, 
                        'price_hotels': totalHotels, 'avgHotels': avgHotels, 'number_activities': selectedActivities, 'price_activites': totalActivities, 
                        'avgActivities': avgActivities, 'city_cost': totalCityCost }
                        
                        cityData.push(selectedCity)
                    });
                    console.log(cityData)
                    console.log(TotalHotelNights)
                    console.log(Object.keys(cities).length)
                    console.log(avgCountryData)
                    this.setState({
                        cityData: cityData,
                        hotelNights: TotalHotelNights,
                        number_cities: Object.keys(cities).length
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