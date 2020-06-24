import React, { Component } from "react";
import NavBar from '../Components/NavBar'

export default class ProfileView extends Component {
    render() {
        return  (
            <div>
                <NavBar data={{tab: '7'}} />
                <h1>Perfil</h1>
            </div>
        )
    }
};