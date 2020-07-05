import React, { Component } from "react";
import { Row } from 'antd';
import DemoNavBar from '../../Components/Demo/DemoNavBar'
import { Button, Icon, Label, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import '../../Assets/styles.css'
import moment from 'moment';

export default class DemoTripDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            destination: "Paris",
            planning_file: "planning.xlsx",
            status: "Active",
            start_date: "2021-01-01",
            end_date: "2021-01-08"
        }
    }

    statusLabel = () => {
        if (this.state.status === "Active") {
            return(
                <Label as='a' color='green' size="huge" ribbon>
                    Futuro
                </Label>
            )
        }
        else if (this.state.status === "Past") {
            return(
                <Label as='a' color='grey' size="huge" ribbon>
                    Pasado
                </Label>
            )
        }
        else{
            return(
                <Label as='a' color='red' size="huge" ribbon>
                    Cancelado
                </Label>
            )
        }
    }

    diffDays(){
        let diff = moment(this.state.end_date).diff(moment(this.state.start_date), 'days')
        if (diff === 0) {
            return 1
        }
        return(diff)
    }

    render() {
        return  (
            <div>
                <DemoNavBar/>
                <Link to={`/demo/trips`}>
                    <Button negative size="medium" style={{marginLeft: "1%", marginTop: "60px", marginBottom: "1%"}}>
                        <Icon name="angle left" />
                        Volver
                    </Button>
                </Link>

                <Link to={`/demo/blocked`}>
                    <Button disabled primary style={{marginLeft: "0.5%", marginTop: "60px", marginBottom: "1%"}}>
                        <Icon name="plane" />
                        Vuelos
                    </Button>
                </Link>
                <Link to={`/demo/blocked`}>
                    <Button disabled primary style={{marginLeft: "0.2%", marginTop: "60px", marginBottom: "1%"}}>
                        <Icon name="building" />
                        Ciudades
                    </Button>
                </Link>
                <Link to={`/demo/blocked`}>
                    <Button disabled primary style={{marginLeft: "0.2%", marginTop: "60px", marginBottom: "1%"}}>
                        <Icon name="dollar sign" />
                        Costo total
                    </Button>
                </Link>
                
                <h1 style={{ marginTop: -20, textAlign:"center" }}>
                    Detalles Viaje
                </h1>
                <br />

                <Segment style={{marginLeft: "10%", width: "80%" }} raised>
                    {this.statusLabel()}
                    <span>{this.state.destination}</span>
                    <br/><br/><br/>
                    <Row style={{position: "absolute", marginTop:"-10px", right: "15px"}}>
                        <Button disabled primary size={'small'} style={{right:"7%"}} onClick={this.onOpenModalEdit} >
                            Editar
                        </Button>
                        <Button disabled negative size={'small'} style={{right:"1%"}} onClick={this.onOpenModalRemove} >
                            Eliminar
                        </Button>
                    </Row>
                    <br/>
                    <Segment.Group>
                        <Segment.Group style={{border:"0" }} raised >
                            <Segment > <b>Duracion del viaje:</b> {this.diffDays()} Dias </Segment>
                        </Segment.Group>
                        <Segment.Group style={{border:"0"}} raised>
                            <Segment> <b>Inicio:</b> {this.state.start_date} </Segment>
                            <Segment><b> Final:</b> {this.state.end_date} </Segment>
                        </Segment.Group>
                        <Segment.Group style={{ border:"0", boxShadow: 0}} raised>
                            <Segment > <b>Archivo de Planificación:</b> {this.state.planning_file} </Segment>
                        </Segment.Group>
                    </Segment.Group>
                </Segment>
            </div>
        )
    }
}