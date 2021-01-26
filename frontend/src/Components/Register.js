import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import "antd/dist/antd.css";
import CryptoJS from "crypto-js";

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            userLogged: this.decrypt(localStorage.getItem('user_logged')),
            username: "",
            password: "",
            email: "",
            country: "",
            visitedCountries: ""
        }
    }
    
    decrypt(value){
        if (value) {
            var bytes  = CryptoJS.AES.decrypt(value.toString(), process.env.REACT_APP_HASH);
            var response = bytes.toString(CryptoJS.enc.Utf8);
            return response    
        }else{
            return null
        }
    }

    onClickCreate = event => {
        event.preventDefault();
        const postObj = {
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email,
            "country": this.state.country,
            "visitedCountries": this.state.visitedCountries,
            "userLogged": this.state.userLogged,
            "permissionLevel": 1
        }
        axios.post(`https://travelplanner.lpsoftware.space/api/users`, postObj,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then(function (response) {
            window.location.href="#/login";
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
        return (
            <div>
                <h1 style={{textAlign: 'center', marginTop: "60px"}}>Registro</h1>
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
                    <Form.Item {...tailFormItemLayout}>
                        <Button primary htmlType="submit">
                            Registrar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}