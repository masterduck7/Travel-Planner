import React, { Component } from "react";
import { Layout, Menu, Icon, Card, Col, Row } from 'antd';

import './Test.css';

const { Footer, Sider } = Layout;

export default class TestView extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    className="sidebar"
                >
                    <div className="logo" style={{color: "white", textAlign: "center"}}>Logo</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">nav 4</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    {/* Title */}
                    <h3 style={{ margin: '24px 24px 0' }}>Hi User,</h3>
                    <h2 style={{ margin: '4px 24px 0' }}>Overview</h2>
                    {/* Overview Data */}
                    <Row gutter={16} style={{ margin: '24px 16px 0' }}>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                            Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                            Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                            Card content
                            </Card>
                        </Col>
                    </Row>
                    {/* Next trips*/}
                    <Card title="Card title" bordered={false} style={{ margin: '24px 24px 0' }}>
                        Card content
                    </Card>
                    <Card title="Card title" bordered={false} style={{ margin: '24px 24px 0' }}>
                        Card content
                    </Card>
                    <Card title="Card title" bordered={false} style={{ margin: '24px 24px 0' }}>
                        Card content
                    </Card>
                    <Footer style={{ textAlign: 'center' }}>By LPSoftware</Footer>
                </Layout>
            </Layout>
        )
    }
};