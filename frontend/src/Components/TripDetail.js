import React, { Component } from "react";
import { Button, Col, DatePicker, Descriptions, Form, Icon, Input, Menu, Row, Select } from 'antd';
import {Link} from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'
import { Modal } from 'react-responsive-modal';
import moment from 'moment';
import axios from 'axios';
import CustomLayout from '../Components/CustomLayout'

const { Option } = Select;

export default class TripDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalEdit: null,
            tripID: null,
            destination: "",
            planning_file: "",
            status: "",
            start_date: "",
            end_date: ""
        }
    }

    onOpenModal = () => {
        this.setState({ 
            modalEdit: true,
            tripID: this.props.trip.trip_id,
            destination: this.props.trip.destination,
            planning_file: this.props.trip.planning_file,
            status: this.props.trip.status,
            start_date: this.props.trip.start_date,
            end_date: this.props.trip.end_date
        });
    };
     
    onCloseModal = () => {
        this.setState({ modalEdit: false });
    };

    onClick = event => {
        event.preventDefault();
        const tripID = this.state.tripID
        const tripObj = {
            destination: this.state.destination,
            planning_file: this.state.planning_file,
            status: this.state.status,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        axios.put(`http://127.0.0.1:8000/trips/${tripID}/`, tripObj)
        .then((response) => {
            alert("Viaje editado")
            window.location.reload(true)
        })
        .catch(function (error) {
          console.log(error);
        });
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
                <CustomLayout />
                <Modal open={this.state.modalEdit} onClose={this.onCloseModal} classNames={{modal: 'customModal'}} center>
                    <h1><center>Editar viaje</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClick.bind(this)} >
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
                            <Button type="primary" htmlType="submit">
                                Editar
                            </Button>
                        </Form.Item>
                    </Form>
                    </p>
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
                                <Link to="/trips"></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="global" />
                                <span>Vuelos</span>
                                <Link to={{ pathname:"/flights", 
                                state: { 
                                    tripID: this.props.trip.trip_id,
                                    trip: this.props.trip 
                                } }}></Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="border" />
                                <span>Hotel</span>
                                <Link to={{ pathname:"/hotels", state: { tripID: this.props.trip.trip_id } }}></Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="environment" />
                                <span>Ciudades</span>
                                <Link to={{ pathname:"/cities", state: { tripID: this.props.trip.trip_id } }} ></Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="bank" />
                                <span>Costos</span>
                                <Link to={{ pathname:"/costs", state: { tripID: this.props.trip.trip_id } }} ></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <Row>
                        <Col span={22}></Col>
                        <Col span={2}>
                            <Button type="primary" size={'small'} style={{top: 10}} onClick={this.onOpenModal} >
                                Editar
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <Descriptions size= "small" layout="vertical" bordered >
                        <Descriptions.Item label="Destino" span={1}>{this.props.trip.destination}</Descriptions.Item>
                        <Descriptions.Item label="Fecha Inicio"span={1}>{this.props.trip.start_date}</Descriptions.Item>
                        <Descriptions.Item label="Fecha Fin"span={1}>{this.props.trip.end_date}</Descriptions.Item>
                        <Descriptions.Item label="Estado" span={1}>{this.props.trip.status}</Descriptions.Item>
                        <Descriptions.Item label="Archivo Planificación" span={1}>{this.props.trip.planning_file}</Descriptions.Item>
                    </Descriptions>
                </Col>
                </Row>
            </div>
        )
    }
}