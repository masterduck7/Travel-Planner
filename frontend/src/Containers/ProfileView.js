import React, { Component } from "react";
import NavBar from '../Components/NavBar';

export default class ProfileView extends Component {
    render() {
        return  (
            <div>
                <NavBar/>
                <h1 style={{marginTop: "60px"}}>Perfil</h1>
            </div>
        )
    }
};