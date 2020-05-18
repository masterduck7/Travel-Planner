import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout'

export default class StatisticsView extends Component {
    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '3'}} />
                <h1>Estadisticas</h1>
            </div>
        )
    }
};