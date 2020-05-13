import React, { Component } from 'react';
import { Col, Divider, Icon, Menu, Row, Table } from 'antd';
import {Link} from 'react-router-dom';

export default class FlightList extends Component {

    render() {
        const columns = [
            {
                title: 'Origen',
                dataIndex: 'origin',
                key: 'origin',
                render: origin => <a>{origin}</a>,
            },
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
                title: 'Aerolinea',
                dataIndex: 'airline_name',
                key: 'airline_name',
                render: airline_name => <a>{airline_name}</a>,
            },
            {
                title: 'Número de vuelo',
                dataIndex: 'flight_number',
                key: 'flight_number',
                render: flight_number => <a>{flight_number}</a>,
            },
            {
                title: 'Precio',
                dataIndex: 'price',
                key: 'price',
                render: price => <a>{price}</a>,
            },
            {
                title: 'Acción',
                key: 'action',
                render: (text, item) => (
                  <span>
                    <Link to='/'><a>Editar</a></Link>
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
                                <Icon type="rollback" />
                                <span>Volver</span>
                                <Link to={`/trips/${this.props.data.tripID}`}></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <Table columns={columns} dataSource={this.props.data.flights} />
                </Col>
                </Row>
            </div>
        )
    }
};