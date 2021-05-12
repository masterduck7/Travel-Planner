import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import NavBar from '../Components/NavBar';
import { Table } from 'antd';
import { Icon, Flag, Statistic, Tab } from 'semantic-ui-react';
import CryptoJS from "crypto-js";

const { getNameList } = require('country-list');

export default class StatisticsView extends Component {

    constructor(props){
        super(props)
        this.state = {
            apiURL: "http://localhost:3000/",
            token: localStorage.getItem('token'),
            user_id: this.decrypt(localStorage.getItem('user_id')),
            country_list: getNameList(),
            totalActivitiesAllTrips : 0,
            avgTotalFlights: 0,
            avgTotalHotels: 0,
            avgTotalActivities: 0,
            avgTotalCityCosts: 0,
            flights: [],       //First view
            cityData: [],      //Second view
            avgCountryData : [], //Third view
            yearData: [],      //Fourth view
            cities_most_visited : 0, //Last View
            number_flights: 0, //Last View
            hotelNights: 0,    //Last View
        }
    }

    decrypt(value){
        if (value) {
            var bytes  = CryptoJS.AES.decrypt(value.toString(), process.env.REACT_APP_HASH);
            var response = bytes.toString(CryptoJS.enc.Utf8);
            return response    
        }else{
            return null
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidMount(){
        // GET YEAR DETAILS
        axios.get(`${this.state.apiURL}trips_user?userID=${this.state.user_id}`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    let yearData = {}
                    let flights = []
                    let total_price_flights = 0
                    let cityData = []
                    let TotalHotelNights = 0
                    let TotalHotelNightsCost = 0
                    let TotalActivitiesAllTrips = 0
                    let TotalActivitiesAllTripsCost = 0
                    let TotalCityCostsAllTrips = 0
                    let cities = {}
                    let avgCountryData = {}

                    res.data.forEach(trip => {
                        let totalFlights = 0
                        let totalHotels = 0
                        let totalActivities = 0
                        let totalCityCost = 0
                        trip.flights.forEach(flight => {
                            totalFlights = Number(totalFlights) + Number(flight.price)
                            let flighData = {
                                'origin': flight.origin,
                                'destination': flight.destination,
                                'date': moment(flight.start_date).format('YYYY/MM')+"/01",
                                'airline': flight.airline_name,
                                'price': flight.price
                            }
                            flights.push(flighData)
                        });
                        total_price_flights = Number(total_price_flights) + Number(totalFlights)
                        trip.cities.forEach(city => {
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
                                totalHotels = Number(totalHotels) + Number(hotel.total_price)
                                selectedHotels = Number(selectedHotels) + 1
                                let diff = moment(hotel.end_date).diff(moment(hotel.start_date), 'days')
                                hotelNights = Number(hotelNights) + Number(diff)
                            });
                            city.activities.forEach(activity => {
                                totalActivities = Number(totalActivities) + Number(activity.total_price)
                                selectedActivities = Number(selectedActivities) + 1
                            });
                            city.citycosts.forEach(citycost => {
                                totalCityCost = Number(totalCityCost) + Number(citycost.total_price)
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
                            TotalActivitiesAllTrips = Number(TotalActivitiesAllTrips) + Number(selectedActivities)
                            TotalHotelNightsCost = Number(TotalHotelNightsCost) + Number(totalHotels)
                            TotalActivitiesAllTripsCost = Number(TotalActivitiesAllTripsCost) + Number(totalActivities)
                            TotalCityCostsAllTrips = Number(TotalCityCostsAllTrips) + Number(totalCityCost)
                            if (!avgCountryData[countryNameCapitalized]) {
                                avgCountryData[countryNameCapitalized] = { 'country': [countryNameCapitalized, city.country.toString()],
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
                                avgCountryData[countryNameCapitalized] = { 'country': [countryNameCapitalized, city.country.toString()],
                                    'number_hotels': selectedHotels + oldSelectedHotels, 'price_hotels': totalHotels + oldTotalHotels, 
                                    'hotelNights': oldHotelNights + hotelNights,
                                    'avgHotels': Number((totalHotels + oldTotalHotels)/(hotelNights + oldHotelNights)).toFixed(2), 
                                    'number_activities': selectedActivities + oldSelectedActivities, 'price_activites': totalActivities + oldTotalActivities, 
                                    'avgActivities': Number((totalActivities + oldTotalActivities)/(selectedActivities + oldSelectedActivities)).toFixed(2), 
                                    'city_cost': totalCityCost + oldTotalCityCost 
                                }
                            }
    
                            let selectedCity = {'country': [countryNameCapitalized, city.country.toString()], 'name': city.name, 'trip_id': city.trip, 'number_hotels': selectedHotels, 
                            'price_hotels': totalHotels, 'avgHotels': avgHotels, 'number_activities': selectedActivities, 'price_activities': totalActivities, 
                            'avgActivities': avgActivities, 'city_cost': totalCityCost }
                            
                            cityData.push(selectedCity)
                        });
                        let date = moment(trip.start_date).format('YYYY/MM')+"/01"
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

                    let arrayAvgCountryData = []
                    for (let obj in avgCountryData){
                        arrayAvgCountryData.push(avgCountryData[obj])
                    }

                    let arrayCities = []
                    for (let obj in cities){
                        arrayCities.push(cities[obj])
                    }

                    let arrayYearData = []
                    for (let obj in yearData){
                        arrayYearData.push(yearData[obj])
                    }

                    this.setState({
                        yearData: arrayYearData,
                        flights: flights,
                        number_flights: flights.length,
                        avgTotalFlights: Number(total_price_flights/flights.length).toFixed(2),
                        cityData: cityData,
                        hotelNights: TotalHotelNights,
                        totalActivitiesAllTrips: TotalActivitiesAllTrips,
                        cities_most_visited: arrayCities,
                        avgCountryData: arrayAvgCountryData,
                        avgTotalHotels: Number(TotalHotelNightsCost/TotalHotelNights).toFixed(2),
                        avgTotalActivities: Number(TotalActivitiesAllTripsCost/TotalActivitiesAllTrips).toFixed(2),
                        avgTotalCityCosts: Number(TotalCityCostsAllTrips/Object.keys(cities).length).toFixed(2),
                    })
                }else{
                    console.log("Error in Get All Trip data")
                }
            })
    }

    render() {

        const columnsYearData = [
            {
                title: <b>Fecha</b>,
                dataIndex: 'date',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => moment(a.date).diff(moment(b.date), 'days'),
                sortDirections: ['ascend','descend'],
                render: date => moment(date).format("MM/YYYY")
            },
            {
                title: <b>Total Vuelos</b>,
                dataIndex: 'totalFlights',
                key: 'totalFlights',
                sorter: (a, b) => a.totalFlights - b.totalFlights,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Total hoteles</b>,
                dataIndex: 'totalHotels',
                key: 'totalHotels',
                sorter: (a, b) => a.totalHotels - b.totalHotels,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Total actividades</b>,
                dataIndex: 'totalActivities',
                key: 'totalActivities',
                sorter: (a, b) => a.totalActivities - b.totalActivities,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Total costos ciudad</b>,
                dataIndex: 'totalCityCost',
                key: 'totalCityCost',
                sorter: (a, b) => a.totalCityCost - b.totalCityCost,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Total</b>,
                dataIndex: 'total',
                key: 'total',
                sorter: (a, b) => a.total - b.total,
                sortDirections: ['ascend','descend']
            }
        ]

        const columnsAvgCountry = [
            {
                title: <b>Pais</b>,
                dataIndex: 'country',
                key: 'country',
                sorter: (a, b) => {
                    if (a.country !== undefined || a.country !== undefined) {
                        return(
                            a.country[0].length - b.country[0].length
                        )
                    }
                },
                sortDirections: ['ascend','descend'],
                render: country => {
                    return(
                        <span>
                        <Flag name={country[1].toLowerCase()} /> {country[0]}
                        </span>
                    )
                }
            },
            {
                title: <b>Promedio $ Hotel</b>,
                dataIndex: 'avgHotels',
                key: 'avgHotels',
                sorter: (a, b) => a.avgHotels - b.avgHotels,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Promedio $ Actividad</b>,
                dataIndex: 'avgActivities',
                key: 'avgActivities',
                sorter: (a, b) => a.avgActivities - b.avgActivities,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Promedio $ Costos ciudad</b>,
                dataIndex: 'city_cost',
                key: 'city_cost',
                sorter: (a, b) => a.city_cost - b.city_cost,
                sortDirections: ['ascend','descend']
            },
        ]

        const columnsFlights = [
            {
                title: <b>Fecha</b>,
                dataIndex: 'date',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => moment(a.date).diff(moment(b.date), 'days'),
                sortDirections: ['ascend','descend'],
                render: date => moment(date).format("MM/YYYY")
            },
            {
                title: <b>Origen</b>,
                dataIndex: 'origin',
                key: 'origin',
                sorter: (a, b) => a.origin.length - b.origin.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Destino</b>,
                dataIndex: 'destination',
                key: 'destination',
                sorter: (a, b) => a.destination.length - b.destination.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Aerolinea</b>,
                dataIndex: 'airline',
                key: 'airline',
                sorter: (a, b) => a.airline.length - b.airline.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Precio</b>,
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
                sortDirections: ['ascend','descend']
            },
        ]

        const columnsCityData = [
            {
                title: <b>Pais</b>,
                dataIndex: 'country',
                key: 'country',
                sorter: (a, b) => {
                    if (a.country !== undefined || a.country !== undefined) {
                        return(
                            a.country[0].length - b.country[0].length
                        )
                    }
                },
                sortDirections: ['ascend','descend'],
                render: country => {
                    return(
                        <span>
                        <Flag name={country[1].toLowerCase()} /> {country[0]}
                        </span>
                    )
                }
            },
            {
                title: <b>Ciudad</b>,
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Nº Hoteles</b>,
                dataIndex: 'number_hotels',
                key: 'number_hotels',
                sorter: (a, b) => a.number_hotels - b.number_hotels,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>$ Gastado en Hoteles</b>,
                dataIndex: 'price_hotels',
                key: 'price_hotels',
                sorter: (a, b) => a.price_hotels - b.price_hotels,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Nº Actividades</b>,
                dataIndex: 'number_activities',
                key: 'number_activities',
                sorter: (a, b) => a.number_activities - b.number_activities,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>$ Gastado en Actividades</b>,
                dataIndex: 'price_activities',
                key: 'price_activities',
                sorter: (a, b) => a.price_activities - b.price_activities,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Total Costos ciudad</b>,
                dataIndex: 'city_cost',
                key: 'city_cost',
                sorter: (a, b) => a.city_cost - b.city_cost,
                sortDirections: ['ascend','descend']
            },
        ]

        const columnsMostVisitedCities = [
            {
                title: <b>Ciudad</b>,
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Visitas</b>,
                dataIndex: 'visits',
                key: 'visits',
                sorter: (a, b) => a.visits.length - b.visits.length,
                sortDirections: ['ascend','descend']
            },
        ]

        const panes = [
            { menuItem: '$ Gastado por Mes/Año', render: () => 
                <Tab.Pane>
                    <Table columns={columnsYearData} dataSource={this.state.yearData} />
                </Tab.Pane> 
            },
            { menuItem: '$ Promedio gastado por pais', render: () => 
                <Tab.Pane>
                    <Table columns={columnsAvgCountry} dataSource={this.state.avgCountryData} />
                </Tab.Pane> 
            },
            { menuItem: 'Detalle vuelos Mes/Año', render: () => 
                <Tab.Pane>
                    <Table columns={columnsFlights} dataSource={this.state.flights} />
                </Tab.Pane> 
            },
            { menuItem: 'Detalle gastos Pais/Mes/Año', render: () => 
                <Tab.Pane>
                    <Table columns={columnsCityData} dataSource={this.state.cityData} />
                </Tab.Pane> 
            },
            { menuItem: 'Ciudades mas visitadas', render: () => 
                <Tab.Pane>
                    <Table columns={columnsMostVisitedCities} dataSource={this.state.cities_most_visited} />
                </Tab.Pane> 
            },
        ]

        return  (
            <div>
                <NavBar/>
                <h1 style={{textAlign: 'center', marginTop: "60px"}}>Estadisticas</h1>
                <br />
                <Statistic.Group size={"tiny"} widths='three' color="grey" >
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='plane' /> {this.state.number_flights}
                        </Statistic.Value>
                        <br />
                        <Statistic.Label>Vuelos</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='hotel' /> {this.state.hotelNights}
                        </Statistic.Value>
                        <br />
                        <Statistic.Label>Noches de hotel</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='futbol outline' /> {this.state.totalActivitiesAllTrips}
                        </Statistic.Value>
                        <br />
                        <Statistic.Label>Actividades</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <br />
                <Statistic.Group size={"tiny"} widths='four' color="grey" >
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='dollar sign' /> {this.state.avgTotalFlights}
                        </Statistic.Value>
                        <br />
                        <Statistic.Label>Promedio vuelo</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='dollar sign' /> {this.state.avgTotalHotels}
                        </Statistic.Value>
                        <br />
                        <Statistic.Label>Promedio noche de hotel</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='dollar sign' /> {this.state.avgTotalActivities}
                        </Statistic.Value>
                        <br />
                        <Statistic.Label>Promedio actividad</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='dollar sign' /> {this.state.avgTotalCityCosts}
                        </Statistic.Value>
                        <br />
                        <Statistic.Label>Promedio gastos ciudad</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <br />
                <br />
                <Tab panes={panes} menu={{ secondary: true, borderless: true }} ></Tab>
            </div>
        )
    }
};