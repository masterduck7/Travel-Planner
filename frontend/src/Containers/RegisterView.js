import React, { Component } from "react";
import NavBar from '../Components/NavBar';
import Register from '../Components/Register';

export default class RegisterView extends Component {
    render() {
        return  (
            <div>
                <NavBar/>
                <Register />
            </div>
        )
    }
};