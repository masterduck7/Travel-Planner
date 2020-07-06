import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Button } from 'semantic-ui-react';
import CryptoJS from "crypto-js";
import axios from 'axios';
import "antd/dist/antd.css";

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            username: "",
            password: ""
        }
    }

    onClickCreate = event => {
        event.preventDefault();
        const postObj = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(`https://travelplanner.lpsoftware.space/api/auth/`, postObj,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then(function (response) {
            var userID = CryptoJS.AES.encrypt(response.data.userID.toString(), process.env.REACT_APP_HASH);
            var userLogged = CryptoJS.AES.encrypt(response.data.userLogged.toString(), process.env.REACT_APP_HASH);
            var userLevel = CryptoJS.AES.encrypt(response.data.userLevel.toString(), process.env.REACT_APP_HASH);
            localStorage.setItem('token',response.data.accessToken)
            localStorage.setItem('refresh_token',response.data.refreshToken)
            localStorage.setItem('user_id', userID)
            localStorage.setItem('user_logged', userLogged)
            localStorage.setItem('user_level', userLevel)
            window.location.href="#/home";
        })
        .catch(function (error) {
            console.log("Error in login", error);
            alert("Usuario/Contraseña incorrecta")
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
                <h1 style={{textAlign: 'center', marginTop: "60px"}}>Login</h1>
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
                    <Form.Item {...tailFormItemLayout}>
                        <Button primary htmlType="submit">
                            Ingresar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}