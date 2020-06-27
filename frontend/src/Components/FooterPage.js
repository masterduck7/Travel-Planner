import React, { Component } from 'react';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import Linkedin from '../Assets/Icons/Linkedin.png';
import Github from '../Assets/Icons/Github.png';

export default class FooterPage extends Component{
    render(){
        return(
            <Footer
                style={{width: window.innerWidth, height: "100%"}}
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
                            {description:"www.lpsoftware.space", style:{color:"white"} }
                        ]
                    }
                ]}
                bottom='By LPSoftware'
            />    
        )
    }
}