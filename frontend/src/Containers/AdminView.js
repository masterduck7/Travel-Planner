import React, { Component } from "react";
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import "antd/dist/antd.css";
import NavBar from '../Components/NavBar';

export default class AdminView extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id'),
            userLogged: localStorage.getItem('user_logged')
        }
    }

    render() {
        return  (
            <div>
                <NavBar/>
                <div style={{marginLeft: "1%", marginTop: "60px", marginBottom: "1%"}} >
                    <Button primary onClick={()=>alert('Not implemented')}>
                        Get summary data
                    </Button>
                    <Link to={`/admin_users`}>
                        <Button style={{marginLeft: "0.5%"}} primary>
                            Admin users
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
};