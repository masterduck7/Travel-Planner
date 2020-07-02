import React, { Component } from "react";
import { Button } from 'semantic-ui-react'
import { Col, Form, Input, Row } from 'antd';
import {Link} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import "antd/dist/antd.css";
import NavBar from '../Components/NavBar';

export default class AdminView extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id'),
            userLogged: localStorage.getItem('user_logged'),
            modalCreate: false,
            username: "",
            password: "",
            email: "",
            country: "",
            visitedCountries: "",
            permissionLevel: 1
        }
    }

    onOpenModalCreate(e){
        this.setState({ 
            modalCreate: true
        });
    }

    onCloseModalCreate= () => {
        this.setState({ modalCreate: false });
    };

    onClickCreate = event => {
        event.preventDefault();
        const postObj = {
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email,
            "country": this.state.country,
            "visitedCountries": this.state.visitedCountries,
            "userLogged": this.state.userLogged,
            "permissionLevel": this.state.permissionLevel
        }
        axios.post(`http://travelplanner.lpsoftware.space/api/users`, postObj,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then(function (response) {
            alert("Usuario agregado")
            window.location.reload();
        })
        .catch(function (error) {
            console.log("Error in login ",error);
            alert("Este usuario ya existe")
            //window.location.reload();
        });
    }

    render() {
        const formItemLayout = {
            labelCol: {
              xs: { span: 12 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 12 },
              sm: { span: 12 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 12,
                offset: 11,
              },
              sm: {
                span: 12,
                offset: 11,
              },
            },
        };
        return  (
            <div>
                <NavBar/>
                <h1 style={{ textAlign:'center', marginTop:"60px"}}>Hola admin</h1>
                <Modal open={this.state.modalCreate} onClose={this.onCloseModalCreate} classNames={{modal: 'customModal'}} center>
                    <h1><center>Agregar Usuario</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClickCreate.bind(this)} >
                    <Form.Item label="Username">
                        <Input name="username"
                        onChange={(e) => {
                            this.setState({
                                username: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password name="password"
                        onChange={(e) => {
                            this.setState({
                                password: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input name="email"
                        onChange={(e) => {
                            this.setState({
                                email: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Country">
                        <Input name="country"
                        onChange={(e) => {
                            this.setState({
                                country: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Visited Countries">
                        <Input name="visitedCountries"
                        onChange={(e) => {
                            this.setState({
                                visitedCountries: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Permission level">
                        <Input name="permissionLevel"
                        onChange={(e) => {
                            this.setState({
                                permissionLevel: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button primary htmlType="submit">
                            Registrar
                        </Button>
                    </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Row justify="space-around" align="middle" style={{marginTop:"40px"}}>
                    <Col xs={{ span: 4, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <Button primary onClick={(e)=> this.onOpenModalCreate(e)}>
                            Add user
                        </Button>
                    </Col>
                    <Col xs={{ span: 8, offset: 3 }} lg={{ span: 6, offset: 2 }}>
                        <Button primary onClick={()=>alert('Not implemented')}>
                            Get summary data
                        </Button>
                    </Col>
                    <Col xs={{ span: 4, offset: 1 }} lg={{ span: 6, offset: 2 }}>
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