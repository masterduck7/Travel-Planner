import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import CustomLayout from '../Components/CustomLayout'
import { Table } from 'antd';

const { getNameList } = require('country-list');

export default class StatisticsView extends Component {

    constructor(props){
        super(props)
        this.state = {
            country_list: getNameList(),
            flights: [],       //First view
            cityData: [],      //Second view
            avgCountryData : [], //Third view
            yearData: [],      //Fourth view
            cities_most_visited : 0, //Last View
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
        // GET CITY DATA
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
                            cities[city.name] = {'name': city.name, visits: 1 }
                        }else{
                            cities[city.name] = {'name': city.name, visits: Number(cities[city.name].visits) + 1 }
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
                            avgCountryData[countryNameCapitalized] = { 'country': countryNameCapitalized,
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
                            avgCountryData[countryNameCapitalized] = { 'country': countryNameCapitalized,
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

                    let arrayAvgCountryData = []

                    for (let obj in avgCountryData){
                        arrayAvgCountryData.push(avgCountryData[obj])
                    }

                    let arrayCities = []

                    for (let obj in cities){
                        arrayCities.push(cities[obj])
                    }

                    console.log(cityData)
                    console.log(TotalHotelNights)
                    console.log(arrayCities)
                    console.log(arrayAvgCountryData)
                    this.setState({
                        cityData: cityData,
                        hotelNights: TotalHotelNights,
                        cities_most_visited: arrayCities,
                        avgCountryData: arrayAvgCountryData
                    })    
                }else{
                    console.log("Error in Get Cost City data")
                }
            })
        // GET YEAR DETAILS
        axios.get(`http://127.0.0.1:8000/trips/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let yearData = {}
                    res.data.forEach(trip => {
                        let totalFlights = 0
                        let totalHotels = 0
                        let totalActivities = 0
                        let totalCityCost = 0
                        trip.flights.forEach(flight => {
                            totalFlights = Number(totalFlights) + Number(flight.price)
                        });
                        trip.cities.forEach(city => {
                            city.hotels.forEach(hotel => {
                                totalHotels = Number(totalHotels) + Number(hotel.total_price)
                            });
                            city.activities.forEach(activity => {
                                totalActivities = Number(totalActivities) + Number(activity.total_price)
                            });
                            city.costs.forEach(cost => {
                                totalCityCost = Number(totalCityCost) + Number(cost.total_price)
                            });
                        });

                        let date = moment(trip.start_date).format('MM/YYYY')

                        if (!yearData[date]) {
                            yearData[date] = {
                                'date': date,
                                'totalFlights': totalFlights,
                                'totalHotels': totalHotels,
                                'totalActivities': totalActivities,
                                'totalCityCost': totalCityCost,
                                'total': totalFlights + totalHotels + totalActivities + totalCityCost
                            }
                        }else{
                            let oldtotalFlights = yearData[date].totalFlights
                            let oldtotalHotels = yearData[date].totalHotels
                            let oldtotalActivities = yearData[date].totalActivities
                            let oldtotalCityCost = yearData[date].totalCityCost
                            yearData[date] = {
                                'date': date,
                                'totalFlights': totalFlights + oldtotalFlights,
                                'totalHotels': totalHotels + oldtotalHotels,
                                'totalActivities': totalActivities + oldtotalActivities,
                                'totalCityCost': totalCityCost + oldtotalCityCost,
                                'total': totalFlights + totalHotels + totalActivities + totalCityCost + 
                                oldtotalFlights + oldtotalHotels + oldtotalActivities + oldtotalCityCost
                            }
                        }
                    });

                    let arrayYearData = []

                    for (let obj in yearData){
                        arrayYearData.push(yearData[obj])
                    }

                    console.log(arrayYearData)
                    this.setState({
                        yearData: arrayYearData
                    })
                }else{
                    console.log("Error in Get Flights of Trip data")
                }
            })
    }

    render() {

        function onChange(pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }

        function onChangeAvgCountry(pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }

        const columnsYearData = [
            {
                title: 'Fecha',
                dataIndex: 'date',
                render: date => <a>{date}</a>,
            },
            {
                title: 'Total Vuelos',
                dataIndex: 'totalFlights',
                sorter: (a, b) => a.totalFlights - b.totalFlights,
                sortDirections: ['ascend','descend'],
                render: totalFlights => <a>{totalFlights}</a>,
            },
            {
                title: 'Total hoteles',
                dataIndex: 'totalHotels',
                sorter: (a, b) => a.totalHotels - b.totalHotels,
                sortDirections: ['ascend','descend'],
                render: totalHotels => <a>{totalHotels}</a>,
            },
            {
                title: 'Total actividades',
                dataIndex: 'totalActivities',
                sorter: (a, b) => a.totalActivities - b.totalActivities,
                sortDirections: ['ascend','descend'],
                render: totalActivities => <a>{totalActivities}</a>,
            },
            {
                title: 'Total costos ciudad',
                dataIndex: 'totalCityCost',
                sorter: (a, b) => a.totalCityCost - b.totalCityCost,
                sortDirections: ['ascend','descend'],
                render: totalCityCost => <a>{totalCityCost}</a>,
            },
            {
                title: 'Total',
                dataIndex: 'total',
                sorter: (a, b) => a.total - b.total,
                sortDirections: ['ascend','descend'],
                render: total => <a>{total}</a>,
            }
        ]

        const columnsAvgCountry = [
            {
                title: 'Pais',
                dataIndex: 'country',
                sorter: (a, b) => a.country - b.country,
                sortDirections: ['ascend'],
                render: country => <a>{country}</a>,
            },
            {
                title: 'Promedio $ Hotel',
                dataIndex: 'avgHotels',
                sorter: (a, b) => a.avgHotels - b.avgHotels,
                sortDirections: ['ascend','descend'],
                render: avgHotels => <a>{avgHotels}</a>,
            },
            {
                title: 'Promedio $ Actividad',
                dataIndex: 'avgActivities',
                sorter: (a, b) => a.avgActivities - b.avgActivities,
                sortDirections: ['ascend','descend'],
                render: avgActivities => <a>{avgActivities}</a>,
            },
            {
                title: 'Promedio $ Costos ciudad',
                dataIndex: 'city_cost',
                sorter: (a, b) => a.city_cost - b.city_cost,
                sortDirections: ['ascend','descend'],
                render: city_cost => <a>{city_cost}</a>,
            },
        ]

        return  (
            <div>
                <CustomLayout data={{tab: '3'}} />
                <h1>Estadisticas</h1>
                <a>Cantidad total de vuelos: {this.state.number_flights}</a>
                <br />
                <a>Cantidad total de noches de hotel: {this.state.hotelNights}</a>
                <br />
                <br />
                <h1>Total gastado por Mes/Año</h1>
                <Table columns={columnsYearData} dataSource={this.state.yearData} onChange={onChange} />
                <h1>Promedio gastado por Pais</h1>
                <Table columns={columnsAvgCountry} dataSource={this.state.avgCountryData} onChange={onChangeAvgCountry} />
            </div>
        )
    }
};