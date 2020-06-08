import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout';
import axios from 'axios';
import moment from 'moment';
import { Table, Tag } from 'antd';
import { Card, Dropdown, Form } from 'semantic-ui-react'

export default class SkyScannerView extends Component {

    constructor(props){
        super(props)
        this.state={
            carriers: {},
            places: {},
            dates: {},
            trips: {},
            months: [],
            origin: "",
            destination: "",
            currency: "USD",
            tripTable: []
        }
    }

    getData(event){
        if (this.state.origin === "" || this.state.destination === "") {
            alert("Favor completar todos los campos")
        }
        else{
            let country = "US"
            let language = "en-US"
            let currency = this.state.currency
            let origin = this.state.origin
            let destination = this.state.destination
            let startDate = "anytime"
            let endDate = "anytime"
            event.preventDefault()
            axios.get(
                `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/${country}/${currency}/${language}/${origin}-sky/${destination}-sky/${startDate}/${endDate}`,
                { 'headers': { 
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "x-rapidapi-key": "6120e74e23msh17f84048c0c59fep1ce941jsnb3248f4b556b"
                }})
                .then(res => {
                    if (!res.data["Error"]) {
                        let carrierData = {}
                        let placeData = {}
                        let tripData = {}
                        let months = []
                        let trips = {}
                        res.data.Carriers.forEach(carrier => {
                                carrierData[carrier.CarrierId] = carrier.Name
                            });
                        res.data.Places.forEach(place => {
                            placeData[place.PlaceId] = [place.SkyscannerCode, place.CityName, place.CountryName ]
                        });
                        res.data.Dates.InboundDates.forEach(date => {
                            if ( Object.keys(tripData).length < 7 ) {
                                tripData[date.PartialDate] = date.QuoteIds
                                months.push(date.PartialDate)
                            }
                        })
                        res.data.Quotes.forEach(trip => {
                            trips[trip.QuoteId] = {
                                "Direct": trip.Direct,
                                "MinPrice": trip.MinPrice,
                                "origin": trip.OutboundLeg ,
                                "destination": trip.InboundLeg
                            }
                        })
                        this.setState({
                            carriers: carrierData,
                            places: placeData,
                            dates: tripData,
                            trips: trips,
                            months: months
                        })
                    }else{
                        console.log("Error in Get Skyscanner data")
                    }
                })
        }
    }

    showData(date){
        let inputDate = this.state.months[date]
        let selectedDate = this.state.dates[inputDate]
        let trips = []
        selectedDate.forEach(trip => {
            let originCarriersTrip = this.state.trips[trip].origin.CarrierIds
            let destinationCarriersTrip = this.state.trips[trip].destination.CarrierIds
            let originCarrierList = ""
            let destinationCarrierList = ""
            if ( typeof(originCarriersTrip) === Array) {
                originCarriersTrip.forEach(carrier => {
                    originCarrierList = originCarrierList + "," + this.state.carriers[carrier]
                });
                originCarrierList = originCarrierList.substr(1);
            }else{
                originCarrierList = this.state.carriers[originCarriersTrip]
            }
            if ( typeof(destinationCarriersTrip) === Array) {
                destinationCarriersTrip.forEach(carrier => {
                    destinationCarrierList = destinationCarrierList + "," + this.state.carriers[carrier]
                }); 
                destinationCarrierList = destinationCarrierList.substr(1);
            }else{
                destinationCarrierList = this.state.carriers[destinationCarriersTrip]
            }
            let tripData = {
                key: this.state.trips[trip].MinPrice+moment(this.state.trips[trip].origin.DepartureDate).format("DD-MM-YYYY HH:MM"),
                direct: this.state.trips[trip].Direct,
                price: this.state.trips[trip].MinPrice,
                origin: moment(this.state.trips[trip].origin.DepartureDate).format("DD-MM-YYYY HH:MM"),
                originAirline: originCarrierList,
                destination: moment(this.state.trips[trip].destination.DepartureDate).format("DD-MM-YYYY HH:MM"),
                destinationAirline: destinationCarrierList
            }
            trips.push(tripData)
        });
        this.setState({
            tripTable: trips
        })
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {

        let currencies = [
            {key: "CLP", value: "CLP", text: "Peso Chileno"},
            {key: "USD", value: "USD", text: "Dolar"},
            {key: "EUR", value: "EUR", text: "Euro"}
        ]

        const columns = [
            {
                title: 'Directo',
                dataIndex: 'direct',
                key: 'direct',
                render: direct => {
                    if (direct) {
                        return (
                            <Tag color={'green'} key={direct}>
                                SI
                            </Tag>
                        )
                    }
                    else {
                        return(
                            <Tag color={'red'} key={direct}>
                                NO
                            </Tag>
                        )
                    }
                }   
            },
            {
                title: 'Precio',
                dataIndex: 'price',
                key: 'price',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.price - b.price,
                sortDirections: ['ascend','descend'],
            },
            {
                title: 'Fecha Ida',
                dataIndex: 'origin',
                key: 'origin'
            },
            {
                title: 'Aerolinea',
                dataIndex: 'originAirline',
                key: 'originAirline',
            },
            {
                title: 'Fecha Vuelta',
                dataIndex: 'destination',
                key: 'destination',
            },
            {
                title: 'Aerolinea',
                dataIndex: 'destinationAirline',
                key: 'destinationAirline',
            }
        ];

        return  (
            <div>
                <CustomLayout data={{tab: '6'}} />
                <h1 style={{textAlign: 'center', marginTop: 20}}>SkyScanner Data</h1>
                <h3 style={{marginLeft: "3%", marginTop: "3%"}}>Buscador de fechas económicas:</h3>
                <Form style={{marginLeft: "3%"}} onSubmit={(e) => this.getData(e)}>
                    <Form.Group>
                    <Form.Input
                        placeholder='Origen'
                        name='origin'
                        value={this.state.origin}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        placeholder='Destino'
                        name='destination'
                        value={this.state.destination}
                        onChange={this.handleChange}
                    />
                    <Dropdown
                        placeholder='Moneda'
                        name='currency'
                        onChange={this.handleChange}
                        selection
                        floating
                        defaultValue={"USD"}
                        options={currencies}
                    />
                    <Form.Button content='Buscar' />
                    </Form.Group>
                </Form>
                <Card.Group style={{marginLeft: "2.5%", marginRight: "2.5%", marginTop: "1%"}} itemsPerRow={7}>
                    <Card color='blue' style={{textAlign: "center"}} header={moment(this.state.months[0]).format("MM/YYYY")} onClick={(event)=> {
                        event.stopPropagation();
                        this.showData(0);
                    }}/>
                    <Card color='teal' style={{textAlign: "center"}} header={moment(this.state.months[1]).format("MM/YYYY")} onClick={(event)=> {
                        event.stopPropagation();
                        this.showData(1);
                    }}/>
                    <Card color='green' style={{textAlign: "center"}} header={moment(this.state.months[2]).format("MM/YYYY")} onClick={(event)=> {
                        event.stopPropagation();
                        this.showData(2);
                    }}/>
                    <Card color='olive' style={{textAlign: "center"}} header={moment(this.state.months[3]).format("MM/YYYY")} onClick={(event)=> {
                        event.stopPropagation();
                        this.showData(3);
                    }}/>
                    <Card color='yellow' style={{textAlign: "center"}} header={moment(this.state.months[4]).format("MM/YYYY")} onClick={(event)=> {
                        event.stopPropagation();
                        this.showData(4);
                    }}/>
                    <Card color='orange' style={{textAlign: "center"}} header={moment(this.state.months[5]).format("MM/YYYY")} onClick={(event)=> {
                        event.stopPropagation();
                        this.showData(5);
                    }}/>
                    <Card color='red' style={{textAlign: "center"}} header={moment(this.state.months[6]).format("MM/YYYY")} onClick={(event)=> {
                        event.stopPropagation();
                        this.showData(6);
                    }}/>
                </Card.Group>
                <Table style={{margin: "3%"}} columns={columns} dataSource={this.state.tripTable} />
            </div>
        )
    }
};