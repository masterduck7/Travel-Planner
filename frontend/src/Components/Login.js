import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
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
        axios.post(`http://127.0.0.1:8000/auth/`, postObj)
        .then(function (response) {
            localStorage.setItem('token',response.data.token)
            window.location.href="#/";
        })
        .catch(function (error) {
            console.log("Error in login");
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
                <h1 style={{textAlign: 'center', marginTop: 20}}>Login</h1>
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
                        <Input name="password"
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