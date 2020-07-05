import React, { Component } from "react";
import Blocked from '../../Assets/Icons/Blocked.png'
import DemoNavBar from '../../Components/Demo/DemoNavBar'

export default class DemoNoAccess extends Component {
    render() {
        return  (
            <div>
                <DemoNavBar />
                <br />
                <img alt="" src={Blocked} style={{display:'block', marginLeft:'auto', marginRight: 'auto', marginTop: '10%'}} height="auto" width='250px' />
                <br/><br/>
                <h2 style={{textAlign:'center'}}>Not visible en demo version</h2>
            </div>
        )
    }
};