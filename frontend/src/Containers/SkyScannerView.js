import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout'

export default class SkyScannerView extends Component {
    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '6'}} />
                <h1>SkyScanner</h1>
            </div>
        )
    }
};