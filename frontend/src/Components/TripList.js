import React, { Component } from 'react';
import { Col, Divider, Icon, Menu, Row, Table } from 'antd';
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
                    <a>Editar</a>
                    <Divider type="vertical" />
                    <a>Eliminar</a>
                  </span>
                ),
            }
        ]
        return(
            <div>
                <Row>
                <Col span={4}>
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
                <Col span={19}>
                    <Table columns={columns} dataSource={this.props.data} />
                </Col>
                </Row>
            </div>
        )
    }
};