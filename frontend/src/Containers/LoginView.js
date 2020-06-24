import React, { Component } from "react";
import NavBar from '../Components/NavBar'
import Login from '../Components/Login'

export default class LoginView extends Component {
    render() {
        return  (
            <div>
                <NavBar/>
                <Login />
            </div>
        )
    }
};