import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import CustomLayout from '../Components/CustomLayout'
import { Table } from 'antd';
import { Icon, Statistic, Tab } from 'semantic-ui-react'

const { getNameList } = require('country-list');

export default class StatisticsView extends Component {

    constructor(props){
        super(props)
        this.state = {
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

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidMount(){
        // GET FLIGHTS DETAILS
        axios.get(`http://127.0.0.1:8000/flights/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let flights = []
                    let total_price_flights = 0
                    res.data.forEach(flight => {
                        let flighData = {
                            'origin': flight.origin,
                            'destination': flight.destination,
                            'date': moment(flight.start_date).format('MM/YYYY'),
                            'airline': flight.airline_name,
                            'price': flight.price
                        }
                        total_price_flights = Number(total_price_flights) + Number(flight.price)
                        flights.push(flighData)
                    });
                    this.setState({
                        flights: flights,
                        number_flights: flights.length,
                        avgTotalFlights: Number(total_price_flights/flights.length).toFixed(2)
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
                    let TotalHotelNightsCost = 0
                    let TotalActivitiesAllTrips = 0
                    let TotalActivitiesAllTripsCost = 0
                    let TotalCityCostsAllTrips = 0
                    let cities = {}
                    let avgCountryData = {}
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
                        TotalActivitiesAllTrips = Number(TotalActivitiesAllTrips) + Number(selectedActivities)
                        TotalHotelNightsCost = Number(TotalHotelNightsCost) + Number(totalHotels)
                        TotalActivitiesAllTripsCost = Number(TotalActivitiesAllTripsCost) + Number(totalActivities)
                        TotalCityCostsAllTrips = Number(TotalCityCostsAllTrips) + Number(totalCityCost)

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

                        let selectedCity = {'country': countryNameCapitalized, 'name': city.name, 'trip_id': city.trip, 'number_hotels': selectedHotels, 
                        'price_hotels': totalHotels, 'avgHotels': avgHotels, 'number_activities': selectedActivities, 'price_activities': totalActivities, 
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

                    this.setState({
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

                    this.setState({
                        yearData: arrayYearData
                    })
                }else{
                    console.log("Error in Get All Trip data")
                }
            })
    }

    render() {

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
                key: 'country',
                sorter: (a, b) => a.country.length - b.country.length,
                sortDirections: ['ascend','descend'],
                render: country => {
                    return(
                        <a>{country}</a>    
                    )
                },
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

        const columnsFlights = [
            {
                title: 'Fecha',
                dataIndex: 'date',
                render: date => <a>{date}</a>,
            },
            {
                title: 'Origen',
                dataIndex: 'origin',
                sorter: (a, b) => a.origin.length - b.origin.length,
                sortDirections: ['ascend','descend'],
                render: origin => <a>{origin}</a>,
            },
            {
                title: 'Destino',
                dataIndex: 'destination',
                sorter: (a, b) => a.destination.length - b.destination.length,
                sortDirections: ['ascend','descend'],
                render: destination => <a>{destination}</a>,
            },
            {
                title: 'Aerolinea',
                dataIndex: 'airline',
                sorter: (a, b) => a.airline.length - b.airline.length,
                sortDirections: ['ascend','descend'],
                render: airline => <a>{airline}</a>,
            },
            {
                title: 'Precio',
                dataIndex: 'price',
                sorter: (a, b) => a.price - b.price,
                sortDirections: ['ascend','descend'],
                render: price => <a>{price}</a>,
            },
        ]

        const columnsCityData = [
            {
                title: 'Pais',
                dataIndex: 'country',
                key: 'country',
                sorter: (a, b) => a.country.length - b.country.length,
                sortDirections: ['ascend','descend'],
                render: country => <a>{country}</a>,
            },
            {
                title: 'Ciudad',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['ascend','descend'],
                render: name => <a>{name}</a>,
            },
            {
                title: 'Nº Hoteles',
                dataIndex: 'number_hotels',
                sorter: (a, b) => a.number_hotels - b.number_hotels,
                sortDirections: ['ascend','descend'],
                render: number_hotels => <a>{number_hotels}</a>,
            },
            {
                title: '$ Gastado en Hoteles',
                dataIndex: 'price_hotels',
                sorter: (a, b) => a.price_hotels - b.price_hotels,
                sortDirections: ['ascend','descend'],
                render: price_hotels => <a>{price_hotels}</a>,
            },
            {
                title: 'Nº Actividades',
                dataIndex: 'number_activities',
                sorter: (a, b) => a.number_activities - b.number_activities,
                sortDirections: ['ascend','descend'],
                render: number_activities => <a>{number_activities}</a>,
            },
            {
                title: '$ Gastado en Actividades',
                dataIndex: 'price_activities',
                sorter: (a, b) => a.price_activities - b.price_activities,
                sortDirections: ['ascend','descend'],
                render: price_activities => <a>{price_activities}</a>,
            },
            {
                title: 'Total Costos ciudad',
                dataIndex: 'city_cost',
                sorter: (a, b) => a.city_cost - b.city_cost,
                sortDirections: ['ascend','descend'],
                render: city_cost => <a>{city_cost}</a>,
            },
        ]

        const columnsMostVisitedCities = [
            {
                title: 'Ciudad',
                dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['ascend','descend'],
                render: name => <a>{name}</a>,
            },
            {
                title: 'Visitas',
                dataIndex: 'visits',
                sorter: (a, b) => a.visits.length - b.visits.length,
                sortDirections: ['ascend','descend'],
                render: visits => <a>{visits}</a>,
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
                <CustomLayout data={{tab: '3'}} />
                <h1 style={{textAlign: 'center', marginTop: 20}}>Estadisticas</h1>
                <br />
                <Statistic.Group size={"tiny"} widths='three' color="grey" >
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='plane' /> {this.state.number_flights}
                        </Statistic.Value>
                        <Statistic.Label>Vuelos</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='hotel' /> {this.state.hotelNights}
                        </Statistic.Value>
                        <Statistic.Label>Noches de hotel</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='futbol outline' /> {this.state.totalActivitiesAllTrips}
                        </Statistic.Value>
                        <Statistic.Label>Actividades</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <br />
                <Statistic.Group size={"tiny"} widths='four' color="grey" >
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='money' /> $ {this.state.avgTotalFlights}
                        </Statistic.Value>
                        <Statistic.Label>Promedio vuelo</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='money' /> $ {this.state.avgTotalHotels}
                        </Statistic.Value>
                        <Statistic.Label>Promedio noche de hotel</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='money' /> $ {this.state.avgTotalActivities}
                        </Statistic.Value>
                        <Statistic.Label>Promedio actividad</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name='money' /> $ {this.state.avgTotalCityCosts}
                        </Statistic.Value>
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