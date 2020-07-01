import React, { Component } from "react";
import NavBar from '../Components/NavBar'

export default class AdminView extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id')
        }
    }

    render() {
        return  (
            <div>
                <NavBar/>
                <h1>Hola admin</h1>
            </div>
        )
    }
};