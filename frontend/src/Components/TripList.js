import React, { Component } from 'react';
import { DatePicker, Form, Input, Row, Select, Table, Tag } from 'antd';
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import moment from 'moment';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'
import CryptoJS from "crypto-js";

const { Option } = Select;

export default class TripList extends Component {

    constructor(props){
        super(props)
        this.state = {
            apiURL: "http://localhost:3000/",
            token: localStorage.getItem('token'),
            user_id: this.decrypt(localStorage.getItem('user_id')),
            modalCreate: false,
            status: "",
            planning_file: "",
            start_date: moment().format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD")
        }
    }

    decrypt(value){
        if (value) {
            var bytes  = CryptoJS.AES.decrypt(value.toString(), process.env.REACT_APP_HASH);
            var response = bytes.toString(CryptoJS.enc.Utf8);
            return response    
        }else{
            return null
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
            userID: this.state.user_id,
            destination: event.target.destination.value,
            start_date: event.target.start_date.value,
            end_date: event.target.end_date.value,
            status: this.state.status,
            planning_file: event.target.planning_file.value
        }
        axios.post(`${this.state.apiURL}trips/`, postObj,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
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
                render: start_date => moment(start_date).format("DD-MM-YYYY")
            },
            {
                title: <b>Fecha Fin</b>,
                dataIndex: 'end_date',
                key: "end_date",
                sorter: (a, b) => moment(a.end_date).diff(moment(b.end_date), 'days'),
                sortDirections: ['ascend','descend'],
                render: end_date => moment(end_date).format("DD-MM-YYYY")
            },
            {
                title: <b>Estado</b>,
                dataIndex: 'status',
                key: 'status',
                sorter: (a, b) => a.status.length - b.status.length,
                sortDirections: ['ascend','descend'],
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
                title: <b>Archivo planificación</b>,
                dataIndex: 'planning_file',
                key: 'planning_file',
                sorter: (a, b) => a.planning_file.length - b.planning_file.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Informacion</b>,
                key: 'action',
                render: (text, item) => (
                  <span>
                    <Link to={`/trips/${item.id}/`}>Ir a detalles</Link>
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
                            <Button primary htmlType="submit">
                                Agregar
                            </Button>
                        </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Row>
                    <Button.Group style={{marginLeft: "1%", marginTop: "60px", marginBottom: "1%"}} size={"medium"}>
                        <Link to={`/trips`}>
                            <Button disabled={this.props.data.tab[0]} primary>
                                Todos
                            </Button>
                        </Link>
                        <Link to={`/past-trips`}>
                            <Button disabled={this.props.data.tab[1]} primary>
                                Pasados
                            </Button>
                        </Link>
                        <Link to={`/cancelled-trips`}>
                            <Button disabled={this.props.data.tab[2]} primary>
                                Cancelados
                            </Button>
                        </Link>
                        <Link to={`/active-trips`}>
                            <Button disabled={this.props.data.tab[3]} primary>
                                Futuros
                            </Button>
                        </Link>
                    </Button.Group>
                </Row>
                <br />
                <h1 style={{ marginTop: -20, textAlign:"center" }}>
                    {this.props.data.type}
                </h1>
                <br />
                <Row>
                    <Button primary size={'small'} style={{ position:"absolute" ,right: "1%", top: "-22px"}} onClick={(e)=> this.onOpenModalCreate(e)}>
                        Agregar viaje
                    </Button>
                </Row>
                <Table style={{margin: "1%"}} columns={columns} dataSource={this.props.data.trips} />
            </div>
        )
    }
};