import React, { Component } from 'react';
import { Button, Col, DatePicker, Form, Icon, Input, Menu, Row, Select, Table, Tag } from 'antd';
import {Link} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import moment from 'moment';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'

const { Option } = Select;

export default class TripList extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalCreate: false,
            status: "",
            planning_file: "",
            start_date: moment().format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD")
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
            destination: event.target.destination.value,
            start_date: event.target.start_date.value,
            end_date: event.target.end_date.value,
            status: this.state.status,
            planning_file: event.target.planning_file.value
        }
        axios.post(`http://127.0.0.1:8000/trips/`, postObj)
        .then(function (response) {
            alert("Viaje agregado")
            window.location.reload();
        })
        .catch(function (error) {
          console.log(error.response);
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

        const columns = [
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
                title: 'Estado',
                dataIndex: 'status',
                key: 'status',
                render: status => {
                    if (status === "Active") {
                        return (
                            <Tag color={'green'} key={status}>
                                FUTURO
                            </Tag>
                        )
                    } 
                    else if (status === "Cancelled") {
                        return(
                            <Tag color={'red'} key={status}>
                                CANCELADO
                            </Tag>
                        )
                    }
                    else {
                        return(
                            <Tag color={'gray'} key={status}>
                                PASADO
                            </Tag>
                        )
                    }
                }                    
            },
            {
                title: 'Archivo planificación',
                dataIndex: 'planning_file',
                key: 'planning_file',
                render: planning_file => <a>{planning_file}</a>,
            },
            {
                title: 'Detalles',
                key: 'action',
                render: (text, item) => (
                  <span>
                    <Link to={`/trips/${item.trip_id}/`}><a>Ir a {item.destination} </a></Link>
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
                        <Form.Item label="Destino">
                            <Input name="destination"
                            onChange={(e) => {
                                this.setState({
                                    destination: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Archivo Excel">
                            <Input name="planning_file" placeholder="Link a archivo en Google Drive"
                            onChange={(e) => {
                                this.setState({
                                    planning_file: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Estado">
                            <Select name="status" placeholder="Por favor seleccione estado del viaje"
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
                                Agregar
                            </Button>
                        </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Row>
                    <Button.Group style={{marginLeft: "1%", marginTop: "1%", marginBottom: "1%"}} size={"medium"}>
                        <Button disabled={this.props.data.tab[0]} type="primary">
                            <Link to="/trips" >Todos</Link>
                        </Button>
                        <Button disabled={this.props.data.tab[1]} type="primary">
                            <Link to="/past-trips" >Pasados</Link>
                        </Button>
                        <Button disabled={this.props.data.tab[2]} type="primary">
                            <Link to="/cancelled-trips" >Cancelados</Link>
                        </Button>
                        <Button disabled={this.props.data.tab[3]} type="primary">
                            <Link to="/active-trips" >Futuros</Link>
                        </Button>
                    </Button.Group>
                </Row>
                <br />
                <h1 style={{ textAlign:"center" }}>
                    {this.props.data.type}
                </h1>
                <br />
                <Row>
                    <Button type="primary" size={'small'} style={{ position:"absolute" ,right: "1%", top: "-22px"}} onClick={(e)=> this.onOpenModalCreate(e)}>
                        Agregar viaje
                    </Button>
                </Row>
                <Table style={{margin: "1%"}} columns={columns} dataSource={this.props.data.trips} />
            </div>
        )
    }
};