import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';

export default class NavBar extends Component{
    constructor(props){
        super(props)
        this.state={
            isLogged : false,
            permissionLevel: false
        }
    }

    componentDidMount(){
        const token = window.localStorage.getItem('token')
        const user_id = window.localStorage.getItem('user_id')
        if (token !== null && user_id !== null) {
            this.setState({
                isLogged: true
            })
            axios.get(`https://travelplanner.lpsoftware.space/api/users/${user_id}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    if (res.data.permissionLevel === 10) {
                        this.setState({
                            permissionLevel: true
                        })
                    }
                }
            })
            .catch(error => {
                console.log("Error in get user data, ", error)
            })
        }
    }

    logout(e){
        //e.preventDefault();
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('refresh_token')
        window.localStorage.removeItem('user_id')
        window.localStorage.removeItem('user_logged')
        window.location.href="#/"
    }
    
    render(){
        if (this.state.isLogged) {
            if (this.state.permissionLevel) {
                return(
                    <Navbar fixed="top" collapseOnSelect expand="lg" style={{backgroundColor: 'gray'}}>
                        <Navbar.Brand style={{color:"white"}} href="#/home">LPSoftware</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link style={{color:"#f5f5f5"}} href="#/home">Inicio</Nav.Link>
                                <Nav.Link style={{color:"#f5f5f5"}} href="#/admin">Administración</Nav.Link>
                                <Nav.Link style={{color:"#f5f5f5"}} href="#/map">Progreso General</Nav.Link>
                                <Nav.Link style={{color:"#f5f5f5"}} href="#/trips">Mis viajes</Nav.Link>
                                <Nav.Link style={{color:"#f5f5f5"}} href="#/calendar">Calendario</Nav.Link>
                                <Nav.Link style={{color:"#f5f5f5"}} href="#/statistics">Estadisticas</Nav.Link>
                                <Nav.Link style={{color:"#f5f5f5"}} href="#/skyscanner">SkyScanner</Nav.Link>
                                <Nav.Link style={{color:"#f5f5f5"}} onClick={(e)=>this.logout()}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
            } else {
                return(
                    <Navbar fixed="top" collapseOnSelect expand="lg" style={{backgroundColor: 'gray'}}>
                        <Navbar.Brand style={{color:"white"}} href="#/home">LPSoftware</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link style={{color:"#f5f5f5"}} href="#/home">Inicio</Nav.Link>
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
            }
        }else{
            return(
                <Navbar fixed="top" collapseOnSelect expand="lg" style={{backgroundColor: 'gray'}}>
                <Navbar.Brand style={{color:"white"}} href="#/">LPSoftware</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link style={{color:"white"}} href="#/login">Login</Nav.Link>
                        {/* <Nav.Link style={{color:"white"}} href="#/register">Registro</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            )
        }
    }
}