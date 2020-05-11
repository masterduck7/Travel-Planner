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
                                <Link to="/trips"></Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="border" />
                                <span>Hotel</span>
                                <Link to="/trips"></Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="environment" />
                                <span>Ciudades</span>
                                <Link to="/trips"></Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="bank" />
                                <span>Costos</span>
                                <Link to="/trips"></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <Descriptions size= "middle" layout="vertical" bordered>
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