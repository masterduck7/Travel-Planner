import React, { Component } from "react";
import { DatePicker, Form, Input, Row, Select } from 'antd';
import { Button, Icon, Label, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'
import { Modal } from 'react-responsive-modal';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

export default class TripDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id'),
            modalEdit: null,
            modalRemove: null,
            destination: "",
            planning_file: "",
            status: "",
            start_date: "",
            end_date: ""
        }
    }

    onOpenModalEdit = () => {
        this.setState({ 
            modalEdit: true,
            id: this.props.trip.id,
            destination: this.props.trip.destination,
            planning_file: this.props.trip.planning_file,
            status: this.props.trip.status,
            start_date: this.props.trip.start_date,
            end_date: this.props.trip.end_date
        });
    };
     
    onCloseModalEdit = () => {
        this.setState({ modalEdit: false });
    };

    onClickEdit = event => {
        event.preventDefault();
        const tripID = this.props.trip.id
        const tripObj = {
            userID: this.state.user_id,
            destination: this.state.destination,
            planning_file: this.state.planning_file,
            status: this.state.status,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        axios.put(`http://travelplanner.lpsoftware.space/api/trips/${tripID}/`, tripObj,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then((response) => {
            alert("Viaje editado")
            window.location.reload();
        })
        .catch(function (error) {
          console.log("Error in edit trip");
        });
    }

    onOpenModalRemove = () => {
        this.setState({modalRemove: true})
    };

    onCloseModalRemove = () => {
        this.setState({modalRemove: false})
    };

    onClickRemove = event => {
        event.preventDefault();
        const tripID = this.props.trip.id
        axios.delete(`http://travelplanner.lpsoftware.space/api/trips/${tripID}/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then(res => {
            alert("Viaje eliminado")
            window.location.href = "/#/trips"
        })
        .catch(error => {
            console.log( "Error in remove trip")
        })
    }

    statusLabel = () => {
        if (this.props.trip.status === "Active") {
            return(
                <Label as='a' color='green' size="huge" ribbon>
                    Futuro
                </Label>
            )
        }
        else if (this.props.trip.status === "Past") {
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
        let diff = moment(this.props.trip.end_date).diff(moment(this.props.trip.start_date), 'days')
        if (diff === 0) {
            return 1
        }
        return(diff)
    }

    render() {

        const formItemLayout = {
            labelCol: {
              xs: { span: 12 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 12 },
              sm: { span: 12 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 12,
                offset: 11,
              },
              sm: {
                span: 12,
                offset: 11,
              },
            },
        };

        return  (
            <div>
                <Modal open={this.state.modalEdit} onClose={this.onCloseModalEdit} classNames={{modal: 'customModal'}} center>
                    <h1><center>Editar viaje</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClickEdit.bind(this)} >
                        <Form.Item label="Destino">
                            <Input name="destination" type="text" value={this.state.destination} 
                            onChange={(e) => {
                                this.setState({
                                    destination: e.target.value
                                })
                            }}/>
                        </Form.Item>
                        <Form.Item label="Archivo Excel">
                            <Input name="planning_file" placeholder="Link a archivo en Google Drive" 
                            value={this.state.planning_file} 
                            onChange={(e) => {
                                this.setState({
                                    planning_file:e.target.value
                                })
                            }}/>
                        </Form.Item>
                        <Form.Item label="Estado">
                            <Select name="status" placeholder="Por favor seleccione estado del viaje"
                            value={this.state.status}
                            onChange={(value) => {
                                this.setState({
                                    status: value
                                })
                            }}>
                                <Option value="Active">Viaje futuro</Option>
                                <Option value="Past">Viaje del pasado</Option>
                                <Option value="Cancelled">Viaje cancelado</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Fecha Inicio">
                            <DatePicker name="start_date" placeholder="Ingrese fecha" format='YYYY-MM-DD'
                            value={moment(this.state.start_date)}
                            onChange={(value) => {
                                this.setState({
                                    start_date: moment(value).format('YYYY-MM-DD')
                                })
                            }}/>
                        </Form.Item>
                        <Form.Item label="Fecha Fin">
                            <DatePicker name="end_date" placeholder="Ingrese fecha" format='YYYY-MM-DD'
                            value={moment(this.state.end_date)}
                            onChange={(value) => {
                                this.setState({
                                    end_date: moment(value).format('YYYY-MM-DD')
                                })
                            }}/>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button primary htmlType="submit">
                                Editar
                            </Button>
                        </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Modal open={this.state.modalRemove} onClose={this.onCloseModalRemove} classNames={{modal: 'customSmallModal'}} center>
                    <h2><center>¿ Desea eliminar el viaje seleccionado ?</center></h2>
                    <p><center>
                        <Button positive size={'large'} style={{right: 25, top: 10}} onClick={this.onClickRemove} >
                            Si
                        </Button>
                        <Button negative size={'large'} style={{left: 25, top: 10}} onClick={this.onCloseModalRemove} >
                            No
                        </Button>
                    </center></p>
                </Modal>
                <Link to={`/trips`}>
                    <Button negative size="medium" style={{marginLeft: "1%", marginTop: "60px", marginBottom: "1%"}}>
                        <Icon name="angle left" />
                        Volver
                    </Button>
                </Link>

                <Link to={`/trips/${this.props.trip.id}/flights`}>
                    <Button primary style={{marginLeft: "0.5%", marginTop: "60px", marginBottom: "1%"}}>
                        <Icon name="plane" />
                        Vuelos
                    </Button>
                </Link>
                <Link to={`/trips/${this.props.trip.id}/cities`}>
                    <Button primary style={{marginLeft: "0.2%", marginTop: "60px", marginBottom: "1%"}}>
                        <Icon name="building" />
                        Ciudades
                    </Button>
                </Link>
                <Link to={`/trips/${this.props.trip.id}/costs`}>
                    <Button primary style={{marginLeft: "0.2%", marginTop: "60px", marginBottom: "1%"}}>
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
                    <span>{this.props.trip.destination}</span>
                    <br/><br/><br/>
                    <Row style={{position: "absolute", marginTop:"-10px", right: "15px"}}>
                        <Button primary size={'small'} style={{right:"7%"}} onClick={this.onOpenModalEdit} >
                            Editar
                        </Button>
                        <Button negative size={'small'} style={{right:"1%"}} onClick={this.onOpenModalRemove} >
                            Eliminar
                        </Button>
                    </Row>
                    <br/>
                    <Segment.Group>
                        <Segment.Group style={{border:"0" }} raised >
                            <Segment > <b>Duracion del viaje:</b> {this.diffDays()} Dias </Segment>
                        </Segment.Group>
                        <Segment.Group style={{border:"0"}} raised>
                            <Segment> <b>Inicio:</b> {this.props.trip.start_date} </Segment>
                            <Segment><b> Final:</b> {this.props.trip.end_date} </Segment>
                        </Segment.Group>
                        <Segment.Group style={{ border:"0", boxShadow: 0}} raised>
                            <Segment > <b>Archivo de Planificación:</b> {this.props.trip.planning_file} </Segment>
                        </Segment.Group>
                    </Segment.Group>
                </Segment>
            </div>
        )
    }
}