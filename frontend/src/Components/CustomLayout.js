import React, { Component } from 'react';
import { Icon, Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import "antd/dist/antd.css";

const { Header } = Layout;

export default class CustomLayout extends Component{
    constructor(props){
        super(props)
        this.state={
            isLogged : false
        }
    }

    componentDidMount(){
        const token = window.localStorage.getItem('token')
        if (token !== null) {
            this.setState({
                isLogged: true
            })
        }
    }

    logout(e){
        //e.preventDefault();
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user_id')
        window.location.href="#/login"
    }
    
    render(){
        if (this.state.isLogged) {
            return(
                <Layout className="layout">
                    <Header>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.props.data.tab]} style={{ lineHeight: '64px', marginLeft: -50 }}>
                            <Menu.Item key="1"><Link to="/"><Icon type="home" />Inicio</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/trips">Mis Viajes</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/calendar">Calendario</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/statistics">Estadísticas</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/map">Progreso</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/skyscanner">SkyScanner</Link></Menu.Item>
                            <Menu.Item key="7"><Link to="/profile">Perfil</Link></Menu.Item>
                            <Menu.Item key="10" onClick={(e)=>this.logout()}>Logout</Menu.Item>
                        </Menu>
                    </Header>
                </Layout>
            )
        }else{
            return(
                <Layout className="layout">
                    <Header>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px', marginLeft: -50 }}>
                            <Menu.Item key="1"><Link to="/"><Icon type="home" />Inicio</Link></Menu.Item>
                            <Menu.Item key="8"><Link to="/login">Login</Link></Menu.Item>
                            <Menu.Item key="9"><Link to="/register">Registro</Link></Menu.Item>
                        </Menu>
                    </Header>
                </Layout>
            )
        }
    }
}