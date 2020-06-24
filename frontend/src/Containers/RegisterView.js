import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout'
import Register from '../Components/Register'

export default class RegistervIEW extends Component {
    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '1'}} />
                <Register />
            </div>
        )
    }
};