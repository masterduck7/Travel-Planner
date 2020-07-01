import React, { Component } from "react";
import NavBar from '../Components/NavBar';

export default class AdminUsersView extends Component {

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
                <h1 style={{ textAlign:'center', marginTop:"60px"}}>Administrar usuarios</h1>
            </div>
        )
    }
};