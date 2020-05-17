import React, { Component } from 'react';
import { Button, Col, DatePicker, Divider, Form, Icon, Input, Menu, Row, Table } from 'antd';
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
            price: ""
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
            trip: this.props.data.tripID,
            origin: event.target.origin.value,
            destination: event.target.destination.value,
            start_date: event.target.start_date.value,
            end_date: event.target.end_date.value,
            airline_name: event.target.airline_name.value,
            flight_number: event.target.flight_number.value,
            price: event.target.price.value
        }
        axios.post(`http://127.0.0.1:8000/flights/`, postObj)
        .then(function (response) {
            alert("Vuelo agregado")
            window.location.href = "/#/trips"
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }

    onOpenModalEdit = (record) => {
        this.setState({ 
            modalEdit: true,
            flight_id: record.flight_id,
            origin: record.origin,
            destination: record.destination,
            airline_name: record.airline_name,
            flight_number: record.flight_number,
            start_date: record.start_date,
            end_date: record.end_date,
            price: record.price
        });
    };

    onCloseModalEdit = () => {
        this.setState({ modalEdit: false });
    };

    onClickEdit = event => {
        event.preventDefault();
        const flightID = this.state.flight_id
        const flightObj = {
            trip: this.props.data.tripID,
            origin: this.state.origin,
            destination: this.state.destination,
            airline_name: this.state.airline_name,
            flight_number: this.state.flight_number,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            price: this.state.price
        }
        axios.put(`http://127.0.0.1:8000/flights/${flightID}/`, flightObj)
        .then((response) => {
            alert("Vuelo editado")
            window.location.href = "/#/trips"
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    onOpenModalRemove = (event, item) => {
        event.preventDefault();
        this.setState({
            modalRemove: true,
            flight_id: item.flight_id,
        })
    }

    onCloseModalRemove = () => {
        this.setState({ modalRemove: false });
    };

    onClickRemove = (event) => {
        event.preventDefault();
        const flightID = this.state.flight_id
        axios.delete(`http://127.0.0.1:8000/flights/${flightID}/`)
        .then(res => {
            alert("Vuelo eliminado")
            window.location.href = "/#/trips"
        })
        .catch(error => {
            console.log(error)
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
                title: 'Origen',
                dataIndex: 'origin',
                key: 'origin',
                render: origin => <a>{origin}</a>,
            },
            {
                title: 'Destino',
                dataIndex: 'destination',
                key: 'destination',
                render: destination => <a>{destination}</a>,
            },
            {
                title: 'Fecha Inicio',
                dataIndex: 'start_date',
                key: 'start_date',
                render: start_date => <a>{start_date}</a>,
            },
            {
                title: 'Fecha Fin',
                dataIndex: 'end_date',
                key: 'end_date',
                render: end_date => <a>{end_date}</a>,
            },
            {
                title: 'Aerolinea',
                dataIndex: 'airline_name',
                key: 'airline_name',
                render: airline_name => <a>{airline_name}</a>,
            },
            {
                title: 'Número de vuelo',
                dataIndex: 'flight_number',
                key: 'flight_number',
                render: flight_number => <a>{flight_number}</a>,
            },
            {
                title: 'Precio',
                dataIndex: 'price',
                key: 'price',
                render: price => <a>{price}</a>,
            },
            {
                title: 'Acción',
                key: 'action',
                render: (text, item) => (
                    <span>
                        <a onClick={(e)=>{
                            e.stopPropagation();
                            this.onOpenModalEdit(item)}}>Editar</a>
                        <Divider type="vertical" />
                        <a onClick={(e)=>{
                            e.stopPropagation();
                            this.onOpenModalRemove(e, item)}}>Eliminar</a>
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
                            <Button type="primary" htmlType="submit">
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
                            <Button type="primary" htmlType="submit">
                                Editar
                            </Button>
                        </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Modal open={this.state.modalRemove} onClose={this.onCloseModalRemove} classNames={{modal: 'customSmallModal'}} center>
                    <h2><center>¿ Desea eliminar el vuelo seleccionado ?</center></h2>
                    <p><center>
                        <Button type="primary" size={'large'} style={{right: 25, top: 10}} 
                            onClick={(e) => this.onClickRemove(e)} >
                            Si
                        </Button>
                        <Button type="danger" size={'large'} style={{left: 25, top: 10}} onClick={this.onCloseModalRemove} >
                            No
                        </Button>
                    </center></p>
                </Modal>
                <Row>
                <Col xs={4} sm={6} md={6} lg={86} xl={4}>
                    <div style={{width: 200}}>
                        <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                        >
                            <Menu.Item key="1">
                                <Icon type="rollback" />
                                <span>Volver</span>
                                <Link to={`/trips/${this.props.data.tripID}`}></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <Row>
                        <Col span={22}></Col>
                        <Col span={2}>
                            <Button type="primary" size={'small'} style={{top: 10}} onClick={(e)=> this.onOpenModalCreate(e)}>
                                Agregar Vuelo
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <Table columns={columns} dataSource={this.props.data.flights}/>
                </Col>
                </Row>
            </div>
        )
    }
};