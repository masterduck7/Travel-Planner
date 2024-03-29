import React, { Component } from "react";
import NavBar from '../Components/NavBar'
import { VectorMap } from "react-jvectormap"
import { Col, Row } from 'antd';
import axios from 'axios';
import { Icon, Flag, Segment, Statistic } from 'semantic-ui-react';
import CryptoJS from "crypto-js";

export default class MapView extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            user_id: this.decrypt(localStorage.getItem('user_id')),
            permissionLevel: false,
            countryCodes: [],
            countries: {},
            total_countries: 0,
            total_cities: 0,
            percentaje_world: 0
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
    
    componentDidMount(){
        axios.get(`https://travelplanner.lpsoftware.space/api/users/${this.state.user_id}`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    if (res.data.permissionLevel === 10) {
                        this.setState({
                            permissionLevel: true
                        })
                    }
                }
            })
            .catch(error => {
                console.log("Error in get user data, ", error)
            })
            
        if (this.state.permissionLevel){
            axios.get(`https://travelplanner.lpsoftware.space/api/trips`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    let visited_countries = {}
                    let visited_cities = {}
                    let countryCodes = []
                    let total_countries = 0
                    res.data.forEach(trip => {
                        trip.cities.forEach(city => {
                            if (!visited_cities[city.name]) {
                                visited_cities[city.name] = city.country
                            }
                            if (city.country) {
                                if (!countryCodes.includes(city.country)) {
                                    countryCodes.push(city.country.toString())
                                }
                                if (!visited_countries[city.country]) {
                                    visited_countries[city.country] = 10
                                    total_countries = total_countries + 1  
                                }
                            }
                        })
                    })
                    this.setState({
                        countries: visited_countries,
                        countryCodes: countryCodes,
                        total_countries: total_countries,
                        total_cities: Object.keys(visited_cities).length,
                        percentaje_world: Number((total_countries/250).toFixed(2))
                    })  
                }else{
                    console.log("Error in Get City Map data")
                }
            })
        }else{
            axios.get(`https://travelplanner.lpsoftware.space/api/trips_user?userID=${this.state.user_id}`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    let visited_countries = {}
                    let visited_cities = {}
                    let countryCodes = []
                    let total_countries = 0
                    res.data.forEach(trip => {
                        trip.cities.forEach(city => {
                            if (!visited_cities[city.name]) {
                                visited_cities[city.name] = city.country
                            }
                            if (city.country) {
                                if (!countryCodes.includes(city.country)) {
                                    countryCodes.push(city.country.toString())
                                }
                                if (!visited_countries[city.country]) {
                                    visited_countries[city.country] = 10
                                    total_countries = total_countries + 1  
                                }
                            }
                        })
                    });
                    this.setState({
                        countries: visited_countries,
                        countryCodes: countryCodes,
                        total_countries: total_countries,
                        total_cities: Object.keys(visited_cities).length,
                        percentaje_world: Number((total_countries/250).toFixed(2))
                    })   
                }else{
                    console.log("Error in Get City Map data")
                }
            })
        }
    }

    render() {

        const countries = this.state.countryCodes
        const listItems = countries.map((country) =>
            <Flag key={country.toLowerCase()} name={country.toLowerCase()} />
        );
        
        return  (
            <div>
                <NavBar/>
                <Col xs={24} sm={12} md={12} lg={86} xl={12} style={{marginTop:"60px"}}>
                    <Row style={{marginTop: "15%"}}>
                        <Statistic.Group size={"large"} widths='1' color="grey" >
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='world' /> {this.state.total_countries}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Paises visitados</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                        <br /><br /><br />
                        <Statistic.Group size={"small"} widths='2' color="grey" >
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='percent' /> {this.state.percentaje_world}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Paises visitados</Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name='list' /> {this.state.total_cities}
                                </Statistic.Value>
                                <br />
                                <Statistic.Label>Ciudades visitadas</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                        <br /><br />
                        <Segment style={{width: "90%", marginLeft: "5%"}}>
                            {listItems}
                        </Segment>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={12} lg={86} xl={12} style={{marginTop:"60px"}}>
                    <div style={{width: 500, height: 500, maxWidth: (window.innerWidth-30)+'px'}}>
                        <h2 style={{textAlign: 'center', marginTop: 20}}>Mapa</h2>
                        <VectorMap
                            map={"world_mill"}
                            backgroundColor="transparent"
                            zoomOnScroll={true}
                            containerStyle={{
                                width: "100%",
                                height: "520px",
                                maxWidth: (window.innerWidth-30)+'px'
                            }}
                            containerClassName="map"
                            regionStyle={{
                                initial: {
                                    fill: "#e4e4e4",
                                    "fill-opacity": 0.9,
                                    stroke: "none",
                                    "stroke-width": 0,
                                    "stroke-opacity": 0
                                },
                                hover: {
                                    "fill-opacity": 0.8,
                                    cursor: "pointer"
                                }
                            }}
                            series={{
                                regions: [
                                    {
                                        values: this.state.countries, //this is your data
                                        scale: ["#011528", "#2594fc"], //your color game's here
                                        normalizeFunction: "polynomial"
                                    }
                                ]
                            }}
                        />
                    </div>
                </Col>
            </div>
        )
    }
};