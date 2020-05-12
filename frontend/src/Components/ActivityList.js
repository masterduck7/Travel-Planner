import React, { Component } from 'react';
import { Col, Divider, Icon, Menu, Row, Table, Tag } from 'antd';
import {Link} from 'react-router-dom';

export default class ActivityList extends Component {

    render() {
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name',
                render: name => <a>{name}</a>,
            },
            {
                title: 'Fecha',
                dataIndex: 'activity_date',
                key: 'activity_date',
                render: activity_date => <a>{activity_date}</a>,
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
                    <Link to={`/activities/${item.activity_id}/`}><a>Editar</a></Link>
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
                                <Link to={{ pathname:"/cities", state: { tripID: this.props.data.tripID } }} ></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <Table columns={columns} dataSource={this.props.data.activities} />
                </Col>
                </Row>
            </div>
        )
    }
};