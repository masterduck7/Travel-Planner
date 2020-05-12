import React, { Component } from 'react';
import { Col, Divider, Icon, Menu, Row, Table, Tag } from 'antd';
import {Link} from 'react-router-dom';

export default class HotelList extends Component {

    render() {
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name',
                render: name => <a>{name}</a>,
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
                title: 'Número de camas',
                dataIndex: 'number_beds',
                key: 'number_beds',
                render: number_beds => <a>{number_beds}</a>,
            },
            {
                title: 'Desayuno',
                dataIndex: 'breakfast',
                key: 'breakfast',
                render: breakfast => {
                    if (breakfast === "true") {
                        return (
                            <Tag color={'green'} key={breakfast}>
                                SI
                            </Tag>
                        )
                    } 
                    else {
                        return(
                            <Tag color={'red'} key={breakfast}>
                                NO
                            </Tag>
                        )
                    }
                }  
            },
            {
                title: 'Precio',
                dataIndex: 'total_price',
                key: 'total_price',
                render: total_price => <a>{total_price}</a>,
            },
            {
                title: 'Precio pagado',
                dataIndex: 'amount_paid',
                key: 'amount_paid',
                render: amount_paid => <a>{amount_paid}</a>,
            },
            {
                title: 'Precio por pagar',
                dataIndex: 'amount_not_paid',
                key: 'amount_not_paid',
                render: amount_not_paid => <a>{amount_not_paid}</a>,
            },
            {
                title: 'Acción',
                key: 'action',
                render: (text, item) => (
                  <span>
                    <Link to={`/hotels/${item.hotel_id}/`}><a>Editar</a></Link>
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
                    <Table columns={columns} dataSource={this.props.data.hotels} />
                </Col>
                </Row>
            </div>
        )
    }
};