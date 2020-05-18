import React, { Component } from "react";
import { Col, Icon, Menu, Row } from 'antd';
import {Link} from 'react-router-dom';
import CustomLayout from '../Components/CustomLayout'

export default class CostView extends Component {
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
                                <Link to={`/trips/${this.props.location.state.tripID}`}></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <h1>Costos</h1>
                </Col>
                </Row>
            </div>
        )
    }
};