import React, { Component } from 'react';
import { Col, Divider, Icon, Menu, Row, Table } from 'antd';
import {Link} from 'react-router-dom';

export default class CityList extends Component {

    render() {
        const columns = [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name',
                render: name => <a>{name}</a>,
            },
            {
                title: 'Mapa',
                dataIndex: 'map_link',
                key: 'map_link',
                render: map_link => <a>{map_link}</a>,
            },
            {
                title: 'Acción',
                key: 'action',
                render: (text, item) => (
                  <span>
                    <Link to={`/cities/${item.city_id}/`}><a>Editar</a></Link>
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
                            <Menu.Item key="2">
                                <Icon type="rollback" />
                                <span>Activities</span>
                                <Link to={{ pathname:"/activities", state: { tripID: this.props.data.tripID } }} ></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <Table columns={columns} dataSource={this.props.data.cities} />
                </Col>
                </Row>
            </div>
        )
    }
};