import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout';
import axios from 'axios';
import { Dropdown, Form } from 'semantic-ui-react'

export default class SkyScannerView extends Component {

    constructor(props){
        super(props)
        this.state={
            carriers: {},
            places: {},
            dates: {},
            trips: {},
            origin: "",
            destination: "",
            currency: ""
        }
    }

    getData(event){
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
                    console.log(res.data)
                    let carrierData = {}
                    let placeData = {}
                    let tripData = {}
                    let trips = {}
                    res.data.Carriers.forEach(carrier => {
                            carrierData[carrier.CarrierId] = carrier.Name
                        });
                    res.data.Places.forEach(place => {
                        placeData[place.PlaceId] = [place.SkyscannerCode, place.CityName, place.CountryName ]
                    });
                    res.data.Dates.InboundDates.forEach(date => {
                        tripData[date.PartialDate] = [date.Price, date.QuoteIds]
                    })
                    res.data.Quotes.forEach(trip => {
                        tripData[trip.QuoteId] = {
                            "Direct": trip.Direct,
                            "MinPrice": trip.MinPrice,
                            "origin": trip.InboundLeg ,
                            "destination": trip.OutboundLeg
                        }
                    })
                    this.setState({
                        carriers: carrierData,
                        places: placeData,
                        dates: tripData,
                        trips: trips
                    })
                }else{
                    console.log("Error in Get Skyscanner data")
                }
            })
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => console.log(this.state.origin, this.state.destination)

    render() {

        let currencies = [
            {key: "CLP", value: "CLP", text: "Peso Chileno"},
            {key: "USD", value: "USD", text: "Dolar"},
            {key: "EUR", value: "EUR", text: "Euro"}
        ]

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
                        options={currencies}
                    />
                    <Form.Button content='Buscar' />
                    </Form.Group>
                </Form>
            </div>
        )
    }
};