import React, { Component } from "react";
import { Button } from 'semantic-ui-react'
import { Col, Row } from 'antd';
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
                <Row justify="space-around" align="middle" style={{marginTop:"60px"}}>
                    <Col xs={{ span: 8, offset: 3 }} lg={{ span: 6, offset: 2 }}>
                        <Button primary onClick={()=>alert('Not implemented')}>
                            Get summary data
                        </Button>
                    </Col>
                    <Col xs={{ span: 8, offset: 3 }} lg={{ span: 6, offset: 2 }}>
                        <Link to={`/admin_users`}>
                            <Button primary>
                                Admin users
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
};