import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout'
import { VectorMap } from "react-jvectormap"
import {Col, Row} from 'antd';

export default class MapView extends Component {
    render() {
        const mapData = {
            CL: 0, // Origin country
            CN: 1,
            IN: 1,
            SA: 1,
            EG: 1,
            SE: 1,
            FI: 1,
            FR: 1,
            US: 1
        };

        return  (
            <div>
                <CustomLayout />
                <Col xs={8} sm={10} md={10} lg={86} xl={8}>

                </Col>
                <Col xs={15} sm={3} md={13} lg={17} xl={15}>
                    <div style={{width: 500, height: 500}}>
                        <h1 style={{textAlign: 'center', marginTop: 20}}>Paises visitados</h1>
                        <VectorMap
                            map={"world_mill"}
                            backgroundColor="transparent"
                            zoomOnScroll={true}
                            containerStyle={{
                                width: "100%",
                                height: "520px"
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
                                        values: mapData, //this is your data
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