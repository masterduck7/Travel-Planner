import React, { Component } from 'react';
import { DatePicker, Form, Input, Row, Table } from 'antd';
import { Button, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import moment from 'moment';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'

export default class FlightList extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            modalCreate: false,
            modalEdit: false,
            modalRemove: false,
            flight_id: "",
            origin: "",
            destination: "",
            airline_name: "",
            flight_number: "",
            start_date: moment().format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD"),
            price: "",
            badge_price: 'USD'
        }
    }

    onOpenModalCreate(e){
        this.setState({ 
            modalCreate: true
        });
    }

    onCloseModalCreate= () => {
        this.setState({ modalCreate: false });
    };

    onClickCreate = event => {
        event.preventDefault();
        const postObj = {
            tripID: this.props.data.tripID,
            origin: event.target.origin.value,
            destination: event.target.destination.value,
            start_date: event.target.start_date.value,
            end_date: event.target.end_date.value,
            airline_name: event.target.airline_name.value,
            flight_number: event.target.flight_number.value,
            price: event.target.price.value,
            badge_price: this.state.badge_price
        }
        console.log(postObj)
        axios.post(`http://travelplanner.lpsoftware.space/api/flights/`, postObj,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then(function (response) {
            alert("Vuelo agregado")
            window.location.reload();
        })
        .catch(function (error) {
          console.log("Error in add flight");
        });
    }

    onOpenModalEdit = (record) => {
        this.setState({ 
            modalEdit: true,
            flight_id: record.id,
            origin: record.origin,
            destination: record.destination,
            airline_name: record.airline_name,
            flight_number: record.flight_number,
            start_date: record.start_date,
            end_date: record.end_date,
            price: record.price,
            badge_price: this.state.badge_price
        });
    };

    onCloseModalEdit = () => {
        this.setState({ modalEdit: false });
    };

    onClickEdit = event => {
        event.preventDefault();
        const flightID = this.state.flight_id
        const flightObj = {
            tripID: this.props.data.tripID,
            origin: this.state.origin,
            destination: this.state.destination,
            airline_name: this.state.airline_name,
            flight_number: this.state.flight_number,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            price: this.state.price,
            badge_price: this.state.badge_price
        }
        axios.put(`http://travelplanner.lpsoftware.space/api/flights/${flightID}/`, flightObj,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then((response) => {
            alert("Vuelo editado")
            window.location.reload();
        })
        .catch(function (error) {
          console.log("Error in edit flight");
        });
    }

    onOpenModalRemove = (event, item) => {
        event.preventDefault();
        this.setState({
            modalRemove: true,
            flight_id: item.id,
        })
    }

    onCloseModalRemove = () => {
        this.setState({ modalRemove: false });
    };

    onClickRemove = (event) => {
        event.preventDefault();
        const flightID = this.state.flight_id
        axios.delete(`http://travelplanner.lpsoftware.space/api/flights/${flightID}/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then(res => {
            alert("Vuelo eliminado")
            window.location.reload();
        })
        .catch(error => {
            console.log("Error in remove flight")
        })
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

        const columns = [
            {
                title: <b>Origen</b>,
                dataIndex: 'origin',
                key: 'origin',
                sorter: (a, b) => a.origin.length - b.origin.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Destino</b>,
                dataIndex: 'destination',
                key: 'destination',
                sorter: (a, b) => a.destination.length - b.destination.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Fecha Inicio</b>,
                dataIndex: 'start_date',
                key: 'start_date',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => moment(a.start_date).diff(moment(b.start_date), 'days'),
                sortDirections: ['ascend','descend'],
                render: start_date => moment(start_date).format("DD/MM/YYYY")
            },
            {
                title: <b>Fecha Fin</b>,
                dataIndex: 'end_date',
                key: 'end_date',
                sorter: (a, b) => moment(a.end_date).diff(moment(b.end_date), 'days'),
                sortDirections: ['ascend','descend'],
                render: end_date => moment(end_date).format("DD/MM/YYYY")
            },
            {
                title: <b>Aerolinea</b>,
                dataIndex: 'airline_name',
                key: 'airline_name',
                sorter: (a, b) => a.airline.length - b.airline.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Nº de vuelo</b>,
                dataIndex: 'flight_number',
                key: 'flight_number',
                sorter: (a, b) => a.flight_number - b.flight_number,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Precio</b>,
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Acción</b>,
                key: 'action',
                render: (text, item) => (
                    <span>
                        <Button basic color="blue" onClick={(e)=>{
                            e.stopPropagation();
                            this.onOpenModalEdit(item)}}>Editar</Button>
                        <Button basic color="red" onClick={(e)=>{
                            e.stopPropagation();
                            this.onOpenModalRemove(e, item)}}>Eliminar</Button>
                    </span>
                ),
            }
        ]
        return(
            <div>
                <Modal open={this.state.modalCreate} onClose={this.onCloseModalCreate} classNames={{modal: 'customModal'}} center>
                    <h1><center>Agregar vuelo</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClickCreate.bind(this)} >
                        <Form.Item label="Origen">
                            <Input name="origin"
                            onChange={(e) => {
                                this.setState({
                                    origin: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Destino">
                            <Input name="destination"
                            onChange={(e) => {
                                this.setState({
                                    destination: e.target.value
                                })
                            }} />
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
                        <Form.Item label="Aerolinea">
                            <Input name="airline_name"
                            onChange={(e) => {
                                this.setState({
                                    airline_name: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Número de vuelo">
                            <Input name="flight_number"
                            onChange={(e) => {
                                this.setState({
                                    flight_number: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Precio">
                            <Input name="price"
                            onChange={(e) => {
                                this.setState({
                                    price: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button primary htmlType="submit">
                                Agregar
                            </Button>
                        </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Modal open={this.state.modalEdit} onClose={this.onCloseModalEdit} classNames={{modal: 'customModal'}} center>
                    <h1><center>Editar vuelo</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClickEdit.bind(this)} >
                        <Form.Item label="Origen">
                            <Input name="origin" type="text" value={this.state.origin} 
                            onChange={(e) => {
                                this.setState({
                                    origin: e.target.value
                                })
                            }}/>
                        </Form.Item>
                        <Form.Item label="Destino">
                            <Input name="destination" type="text" value={this.state.destination} 
                            onChange={(e) => {
                                this.setState({
                                    destination: e.target.value
                                })
                            }}/>
                        </Form.Item>
                        <Form.Item label="Aerolinea">
                            <Input name="airline_name" value={this.state.airline_name} 
                            onChange={(e) => {
                                this.setState({
                                    airline_name:e.target.value
                                })
                            }}/>
                        </Form.Item>
                        <Form.Item label="Numero de vuelo">
                            <Input name="flight_number" value={this.state.flight_number}
                            onChange={(value) => {
                                this.setState({
                                    flight_number: value
                                })
                            }}/>
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
                        <Form.Item label="Precio">
                            <Input name="price" value={this.state.price}
                            onChange={(value) => {
                                this.setState({
                                    price: value
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
                    <h2><center>¿ Desea eliminar el vuelo seleccionado ?</center></h2>
                    <p><center>
                        <Button positive size={'large'} style={{right: 25, top: 10}} 
                            onClick={(e) => this.onClickRemove(e)} >
                            Si
                        </Button>
                        <Button negative size={'large'} style={{left: 25, top: 10}} onClick={this.onCloseModalRemove} >
                            No
                        </Button>
                    </center></p>
                </Modal>
                <Link to={`/trips/${this.props.data.tripID}`}>
                    <Button negative style={{marginLeft: "1%", marginTop: "60px", marginBottom: "1%"}}>
                        <Icon name="angle left" />
                        Volver
                    </Button>
                </Link>
                <h1 style={{ marginTop: -20, textAlign:"center" }}>
                    Vuelos
                </h1>
                <Row>
                    <Button primary size={'small'} style={{ position:"absolute" ,right: "1%", top: "-22px"}} onClick={(e)=> this.onOpenModalCreate(e)}>
                        Agregar Vuelo
                    </Button>
                </Row>
                <Table style={{margin: "1%"}} columns={columns} dataSource={this.props.data.flights} />
            </div>
        )
    }
};