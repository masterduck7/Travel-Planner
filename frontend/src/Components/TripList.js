import React, { Component } from 'react';
import { Col, Divider, Icon, Menu, Row, Table, Tag } from 'antd';
import {Link} from 'react-router-dom';

export default class TripList extends Component {

    render() {
        const columns = [
            {
                title: 'Destino',
                dataIndex: 'destination',
                key: 'destination',
                render: destination => <a>{destination}</a>,
            },
            {
                title: 'Fecha Inicio',
                dataIndex: 'start_date',
                key: 'start_date',
                render: start_date => <a>{start_date}</a>,
            },
            {
                title: 'Fecha Fin',
                dataIndex: 'end_date',
                key: 'end_date',
                render: end_date => <a>{end_date}</a>,
            },
            {
                title: 'Estado',
                dataIndex: 'status',
                key: 'status',
                render: status => {
                    if (status === "Active") {
                        return (
                            <Tag color={'green'} key={status}>
                                ACTIVO
                            </Tag>
                        )
                    } 
                    else if (status === "Cancelled") {
                        return(
                            <Tag color={'red'} key={status}>
                                CANCELADO
                            </Tag>
                        )
                    }
                    else {
                        return(
                            <Tag color={'gray'} key={status}>
                                PASADO
                            </Tag>
                        )
                    }
                }                    
            },
            {
                title: 'Archivo planificación',
                dataIndex: 'planning_file',
                key: 'planning_file',
                render: planning_file => <a>{planning_file}</a>,
            },
            {
                title: 'Acción',
                key: 'action',
                render: (text, item) => (
                  <span>
                    <Link to={`/trips/${item.trip_id}/`}><a>Editar</a></Link>
                    <Divider type="vertical" />
                    <a>Eliminar</a>
                  </span>
                ),
            }
        ]
        return(
            <div>
                <Row>
                <Col xs={4} sm={6} md={6} lg={86} xl={4}>
                    <div style={{width: 200}}>
                        <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                        >
                            <Menu.Item key="1">
                                <Icon type="history" />
                                <span>Anteriores</span>
                                <Link to="/trips"></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="environment" />
                                <span>Futuros</span>
                                <Link to="/trips"></Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="stop" />
                                <span>Cancelados</span>
                                <Link to="/trips"></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <Table columns={columns} dataSource={this.props.data} />
                </Col>
                </Row>
            </div>
        )
    }
};