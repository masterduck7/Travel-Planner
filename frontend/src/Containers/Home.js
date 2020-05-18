import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout'

export default class Home extends Component {
    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '1'}} />
                <h1>Dashboard</h1>
            </div>
        )
    }
};