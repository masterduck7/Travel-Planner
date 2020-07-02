import React, { Component } from "react";
import axios from 'axios';
import NavBar from '../Components/NavBar';
import UserList from '../Components/UserList'

export default class AdminUsersView extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            users: []
        }
    }
    
    componentDidMount(){
        axios.get(`http://travelplanner.lpsoftware.space/api/users/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        users: res.data
                    })
                }else{
                    console.log("Error in Get user data")
                }
            })
    }


    render() {
        return  (
            <div>
                <NavBar/>
                <h1 style={{ textAlign:'center', marginTop:"60px"}}>Administrar usuarios</h1>
                <UserList data={{ users: this.state.users }}/>
            </div>
        )
    }
};