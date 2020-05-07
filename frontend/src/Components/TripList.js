import React, { Component } from 'react';
import { Col, Icon, List, Menu, Row } from 'antd';
import {Link} from 'react-router-dom';

export default class TripList extends Component {

    render() {
        return(
            <div>
                <Row>
                <Col span={6}>
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
                <Col span={18}>
                    <List
                        style={{ marginLeft:"-10%", marginRight:"5%"}}
                        dataSource={this.props.data}
                        renderItem={item => (
                            <List.Item>
                            <List.Item.Meta
                            title={item.destination}
                            description={item.planning_file}
                            />
                            <p>{item.start_date}</p>
                            <p>{item.end_date}</p>
                            </List.Item>
                        )}
                    />
                </Col>
                </Row>
            </div>
        )
    }
};