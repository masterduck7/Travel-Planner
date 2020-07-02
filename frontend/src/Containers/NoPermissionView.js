import React, { Component } from "react";
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Blocked from '../Assets/Icons/Blocked.png'

export default class NoPermissionView extends Component {
    render() {
        return  (
            <div>
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