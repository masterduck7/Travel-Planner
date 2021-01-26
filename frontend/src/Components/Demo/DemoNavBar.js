import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export default class DemoNavBar extends Component{
    render(){
        return(
            <Navbar fixed="top" collapseOnSelect expand="lg" style={{backgroundColor: 'gray'}}>
                <Navbar.Brand style={{color:"white"}} href="#/">LPSoftware</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link style={{color:"#f5f5f5"}} href="#/demo">Inicio</Nav.Link>
                        <Nav.Link style={{color:"#f5f5f5"}} href="#/demo/map">Progreso</Nav.Link>
                        <Nav.Link style={{color:"#f5f5f5"}} href="#/demo/trips">Mis viajes</Nav.Link>
                        <Nav.Link style={{color:"#f5f5f5"}} href="#/demo/calendar">Calendario</Nav.Link>
                        <Nav.Link style={{color:"#f5f5f5"}} href="#/demo/blocked">Estadisticas</Nav.Link>
                        <Nav.Link style={{color:"#f5f5f5"}} href="#/demo/blocked">SkyScanner</Nav.Link>
                        <Nav.Link style={{color:"#f5f5f5"}} href="#/">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}