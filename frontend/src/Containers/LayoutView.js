import React, { Component } from "react";
import { Nav, Navbar } from 'react-bootstrap';
import IcelandLPTravels from '../Assets/IcelandLPTravels.png'

export default class LayoutView extends Component {
    constructor(props){
        super(props)
        this.state = {
            isTop: "transparent",
            marginNavBar: "0px"
        }
    }

    componentDidMount() {
        const isMobile = window.innerWidth < 1000;
        if (isMobile) {
            this.setState({
                isTop: "gray",
                marginNavBar: "40px"
            })
        }else{
            document.addEventListener('scroll', () => {
                const isTop = window.scrollY < 100;
                if (isTop) {
                    this.setState({
                        isTop: "transparent"
                    })
                }else{
                    this.setState({
                        isTop: "gray"
                    })
                }
            });
        }
    }
    render() {
        return  (
            <>
            <Navbar fixed="top" collapseOnSelect expand="lg" style={{backgroundColor:this.state.isTop}}>
                <Navbar.Brand style={{color:"white"}} href="#/">LPSoftware</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link style={{color:"white"}} href="#/login">Login</Nav.Link>
                        <Nav.Link style={{color:"white"}} href="#/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <img alt="" src={IcelandLPTravels} style={{marginTop:this.state.marginNavBar}} height="auto" width={window.innerWidth} />
            </>
        )
    }
};