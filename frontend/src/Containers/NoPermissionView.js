import React, { Component } from "react";
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Blocked from '../Assets/Icons/Blocked.png'

export default class NoPermissionView extends Component {
    render() {
        return  (
            <div>
                <Link to={`/home`}>
                    <Button negative style={{marginLeft: "1%", marginTop: "20px", marginBottom: "1%"}}>
                        <Icon name="angle left" />
                        Volver
                    </Button>
                </Link>
                <br />
                <img alt="" src={Blocked} style={{display:'block', marginLeft:'auto', marginRight: 'auto', marginTop: '10%'}} height="auto" width='250px' />
                <br/><br/>
                <h2 style={{textAlign:'center'}}>You don't have permission to view this page</h2>
                <h4 style={{textAlign:'center'}}>Contact administrator</h4>
                <br/>
                <Link to={`/login`}>
                    <Button style={{display:'block', marginLeft:'auto', marginRight: 'auto'}} primary>
                        Login
                    </Button>
                </Link>
            </div>
        )
    }
};