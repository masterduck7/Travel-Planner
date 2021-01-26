import React, { Component } from "react";
import { Carousel, Nav, Navbar } from 'react-bootstrap';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import Cover from '../Assets/Covers/Cover.png'
import Slide1 from '../Assets/Covers/Slide1.png';
import Slide2 from '../Assets/Covers/Slide2.png';
import Slide3 from '../Assets/Covers/Slide3.png';
import Slide4 from '../Assets/Covers/Slide4.png';
import Linkedin from '../Assets/Icons/Linkedin.png';
import Github from '../Assets/Icons/Github.png';


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
                <Navbar.Brand style={{color:"white"}} href="https://www.lpsoftware.space">LPSoftware</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link style={{color:"white"}} href="#/demo">Demo</Nav.Link>
                        <Nav.Link style={{color:"white"}} href="#/login">Ingresar</Nav.Link>
                        {/* <Nav.Link style={{color:"white"}} href="#/register">Registro</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <img alt="" src={Cover} style={{marginTop:this.state.marginNavBar}} height="auto" width={window.innerWidth} />
            
            <Carousel style={{width: window.innerWidth}} interval={3000} >
                <Carousel.Item>
                    <img
                        style={{width:window.innerWidth, height:"auto"}}
                        src={Slide1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{width:window.innerWidth, height:"auto"}}
                        src={Slide2}
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{width:window.innerWidth, height:"auto"}}
                        src={Slide3}
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{width:window.innerWidth, height:"auto"}}
                        src={Slide4}
                        alt="Fourth slide"
                    />
                </Carousel.Item>
            </Carousel>
            
            <Footer
                style={{width: window.innerWidth}}
                theme="dark"
                columns={[
                    {
                        title: 'LPSoftware',
                        items: [
                            {description:'Web Development', style:{color:"white"} },
                            {description:'Mobile Development', style:{color:"white"} }
                        ]
                    },
                    {
                        title: 'Follow',
                        items:[
                            { icon:
                                <div style={{marginLeft:"-30px"}}> 
                                <a href="https://www.linkedin.com/in/luis-ramirez-duarte/">
                                    <img alt="" src={Linkedin} style={{width:"40px"}} />
                                </a>
                                <a href="https://www.github.com/masterduck7" style={{ position:"absolute", top:"-5px", left: "30px" }} >
                                    <img alt="" src={Github} style={{width:"40px"}} />
                                </a>
                                </div>
                            }
                        ]
                    },
                    {
                        title: 'Contact',
                        items: [
                            {description:"Luis Ramirez", style:{color:"white"} },
                            {description: <a href="mailto:lp.ramirez.duarte.7@gmail.com">lp.ramirez.duarte.7@gmail.com</a>, style:{color:"white"} }
                        ]
                    }
                ]}
                bottom='Made with React JS + Django'
            />
            </>
        )
    }
};