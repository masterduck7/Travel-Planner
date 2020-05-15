import React, { Component } from "react";
import { Button, Col, Descriptions, Icon, Menu, Row } from 'antd';
import {Link} from 'react-router-dom';
import CustomLayout from '../Components/CustomLayout'

export default class TripDetail extends Component {
    render() {
        return  (
            <div>
                <CustomLayout />
                <Row>
                <Col xs={4} sm={6} md={6} lg={86} xl={4}>
                    <div style={{width: 200}}>
                        <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                        >
                            <Menu.Item key="1">
                                <Icon type="rollback" />
                                <span>Volver</span>
                                <Link to="/trips"></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="global" />
                                <span>Vuelos</span>
                                <Link to={{ pathname:"/flights", 
                                state: { 
                                    tripID: this.props.trip.trip_id,
                                    trip: this.props.trip 
                                } }}></Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="border" />
                                <span>Hotel</span>
                                <Link to={{ pathname:"/hotels", state: { tripID: this.props.trip.trip_id } }}></Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="environment" />
                                <span>Ciudades</span>
                                <Link to={{ pathname:"/cities", state: { tripID: this.props.trip.trip_id } }} ></Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="bank" />
                                <span>Costos</span>
                                <Link to={{ pathname:"/costs", state: { tripID: this.props.trip.trip_id } }} ></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <Row>
                        <Col span={22}></Col>
                        <Col span={2}>
                            <Button type="primary" size={'small'} style={{top: 10}} >
                                <Link to={{ pathname:`/trips/edit/${this.props.trip.trip_id}`, params: { tripID: this.props.trip.trip_id } }} >Editar</Link>
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <Descriptions size= "small" layout="vertical" bordered >
                        <Descriptions.Item label="Destino" span={1}>{this.props.trip.destination}</Descriptions.Item>
                        <Descriptions.Item label="Fecha Inicio"span={1}>{this.props.trip.start_date}</Descriptions.Item>
                        <Descriptions.Item label="Fecha Fin"span={1}>{this.props.trip.end_date}</Descriptions.Item>
                        <Descriptions.Item label="Estado" span={1}>{this.props.trip.status}</Descriptions.Item>
                        <Descriptions.Item label="Archivo Planificación" span={1}>{this.props.trip.planning_file}</Descriptions.Item>
                    </Descriptions>
                </Col>
                </Row>
            </div>
        )
    }
}