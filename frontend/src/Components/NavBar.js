import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export default class NavBar extends Component{
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
        window.location.href="#/"
    }
    
    render(){
        if (this.state.isLogged) {
            return(
                <Navbar fixed="top" collapseOnSelect expand="lg" style={{backgroundColor: 'gray'}}>
                    <Navbar.Brand style={{color:"white"}} href="#/home">Inicio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link style={{color:"#f5f5f5"}} href="#/map">Progreso</Nav.Link>
                            <Nav.Link style={{color:"#f5f5f5"}} href="#/trips">Mis viajes</Nav.Link>
                            <Nav.Link style={{color:"#f5f5f5"}} href="#/calendar">Calendario</Nav.Link>
                            <Nav.Link style={{color:"#f5f5f5"}} href="#/statistics">Estadisticas</Nav.Link>
                            <Nav.Link style={{color:"#f5f5f5"}} href="#/skyscanner">SkyScanner</Nav.Link>
                            <Nav.Link style={{color:"#f5f5f5"}} onClick={(e)=>this.logout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
        }else{
            return(
                <Navbar fixed="top" collapseOnSelect expand="lg" style={{backgroundColor: 'gray'}}>
                <Navbar.Brand style={{color:"white"}} href="#/">Inicio</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link style={{color:"white"}} href="#/login">Login</Nav.Link>
                        <Nav.Link style={{color:"white"}} href="#/register">Registro</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            )
        }
    }
}