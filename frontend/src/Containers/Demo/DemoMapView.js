import React, { Component } from "react";
import DemoNavBar from '../../Components/Demo/DemoNavBar';
import { VectorMap } from "react-jvectormap";
import { Col, Row } from 'antd';
import { Icon, Flag, Segment, Statistic } from 'semantic-ui-react';

export default class DemoMapView extends Component {

    constructor(props){
        super(props)
        this.state = {
            countryCodes: ['CL','FR','ES','US','PE','BE','IS','CN','AU','ZA'],
            countries: {'CL': 10, 'FR': 1,'ES': 1,'US': 1,'PE': 1,'BE': 1,'IS': 1,'CN': 1,'AU': 1,'ZA': 1},
            total_countries: 10,
            total_cities: 15,
            percentaje_world: Number((10/250).toFixed(2))
        }
    }
    
    render() {

        const countries = this.state.countryCodes
        const listItems = countries.map((country) =>
            <Flag key={country.toLowerCase()} name={country.toLowerCase()} />
        );
        
        return  (
            <div>
                <DemoNavBar/>
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