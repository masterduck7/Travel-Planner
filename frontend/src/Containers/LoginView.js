import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout'
import Login from '../Components/Login'

export default class LoginView extends Component {
    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '1'}} />
                <Login />
            </div>
        )
    }
};