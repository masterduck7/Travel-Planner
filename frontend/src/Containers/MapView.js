import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout'
import { VectorMap } from "react-jvectormap"
import { Col } from 'antd';
import axios from 'axios';

export default class MapView extends Component {

    constructor(props){
        super(props)
        this.state = {
            countries : {},
            total_countries: 1,
            percentaje_world: 0
        }
    }
    
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/cities/`)
            .then(res => {
                if (!res.data["Error"]) {
                    let visited_countries = {CL: 0}
                    let total_countries = 1
                    res.data.forEach(city => {
                        if (city.country) {
                            if (!visited_countries[city.country]) {
                                visited_countries[city.country] = 10
                                total_countries = total_countries + 1  
                            }
                        }
                    });
                    console.log(visited_countries)
                    this.setState({
                        countries: visited_countries,
                        total_countries: total_countries,
                        percentaje_world: Number((total_countries/250).toFixed(2))
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
                <h1 style={{textAlign: 'center', marginTop: 20}}>Paises visitados</h1>
                <Col xs={24} sm={12} md={12} lg={86} xl={12}>
                    <h2 style={{textAlign: 'center', marginTop: 20}}>Cantidad</h2>
                    <h3 style={{textAlign: 'center', marginTop: 20}}>Numero de paises visitados: {this.state.total_countries}</h3>
                    <h3 style={{textAlign: 'center', marginTop: 20}}>Porcentaje paises visitados: {this.state.percentaje_world} % </h3>
                </Col>
                <Col xs={24} sm={12} md={12} lg={86} xl={12}>
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
                                        scale: ["#ff0000", "#146804"], //your color game's here
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