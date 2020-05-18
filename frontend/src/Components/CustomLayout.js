import React, { Component } from 'react';
import { Icon, Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import "antd/dist/antd.css";

const { Header } = Layout;

export default class CustomLayout extends Component{
    render(){
        return (
            <Layout className="layout">
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.props.data.tab]} style={{ lineHeight: '64px', marginLeft: -50 }}>
                        <Menu.Item key="1"><Link to="/"><Icon type="home" />Inicio</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/trips">Mis Viajes</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/statistics">Estadísticas</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/map">Progreso</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="/skyscanner">SkyScanner</Link></Menu.Item>
                        <Menu.Item key="6"><Link to="/profile">Usuario</Link></Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        )
    }
}