import React, { Component } from "react";
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import NavBar from '../Components/NavBar';

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
                <h1 style={{ textAlign:'center', marginTop:"60px"}}>Hola admin</h1>
                <Button.Group style={{marginLeft: "1%", marginTop: "20px", marginBottom: "1%"}} size={"medium"}>
                    <Link to={`/register`}>
                        <Button primary>
                            Agregar usuario
                        </Button>
                    </Link>
                    <Button primary onClick={()=>alert('Not implemented')}>
                        Obtener datos de todos los usuarios
                    </Button>
                    <Link to={`/admin_users`}>
                        <Button primary>
                            Administrar usuarios
                        </Button>
                    </Link>
                </Button.Group>
            </div>
        )
    }
};