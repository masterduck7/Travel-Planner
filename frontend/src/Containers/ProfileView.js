import React, { Component } from "react";
import CustomLayout from '../Components/CustomLayout'

export default class ProfileView extends Component {
    render() {
        return  (
            <div>
                <CustomLayout data={{tab: '6'}} />
                <h1>Perfil</h1>
            </div>
        )
    }
};