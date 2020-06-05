import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout';
import axios from 'axios';

export default class SkyScannerView extends Component {

    constructor(props){
        super(props)
        this.state={
            carriers: {},
            places: {},
            dates: {},
            trips: {}
        }
    }

    getData(event){
        let currency = "USD"
        let country = "US"
        let language = "en-US"
        let origin = "SFO"
        let destination = "LAX"
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

    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '6'}} />
                <h1>SkyScanner</h1>
                <button onClick={ (event) => this.getData(event)} >hola</button>
            </div>
        )
    }
};