import React, { Component } from 'react';
import { Checkbox, DatePicker, Form, Input, Row, Table, Tag } from 'antd';
import { Button, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import moment from 'moment';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'

export default class HotelList extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalCreate: false,
            modalEdit: false,
            modalRemove: false,
            hotel_id: "",
            name: "",
            number_beds: "",
            breakfast: false,
            total_price: "",
            amount_paid: "",
            amount_not_paid: "",
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
            city: this.props.data.cityID,
            name: event.target.name.value,
            number_beds: event.target.number_beds.value,
            start_date: event.target.start_date.value,
            end_date: event.target.end_date.value,
            breakfast: this.state.breakfast,
            total_price: event.target.total_price.value,
            amount_paid: event.target.amount_paid.value,
            amount_not_paid: event.target.amount_not_paid.value
        }
        axios.post(`http://127.0.0.1:8000/hotels/`, postObj)
        .then(function (response) {
            alert("Hotel agregado")
            window.location.reload();
        })
        .catch(function (error) {
          console.log("Error in add hotel");
        });
    }

    onOpenModalEdit = (record) => {
        this.setState({ 
            modalEdit: true,
            hotel_id: record.hotel_id,
            name: record.name,
            number_beds: record.number_beds,
            breakfast: record.breakfast,
            start_date: record.start_date,
            end_date: record.end_date,
            total_price: record.total_price,
            amount_paid: record.amount_paid,
            amount_not_paid: record.amount_not_paid
        });
    };

    onCloseModalEdit = () => {
        this.setState({ modalEdit: false });
    };

    onClickEdit = event => {
        event.preventDefault();
        const hotelID = this.state.hotel_id
        const hotelObj = {
            city: this.props.data.cityID,
            name: this.state.name,
            number_beds: this.state.number_beds,
            breakfast: this.state.breakfast,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            total_price: this.state.total_price,
            amount_paid: this.state.amount_paid,
            amount_not_paid: this.state.amount_not_paid
        }
        axios.put(`http://127.0.0.1:8000/hotels/${hotelID}/`, hotelObj)
        .then((response) => {
            alert("Hotel editado")
            window.location.reload();
        })
        .catch(function (error) {
          console.log("Error in edit hotel");
        });
    }

    onOpenModalRemove = (event, item) => {
        event.preventDefault();
        this.setState({
            modalRemove: true,
            hotel_id: item.hotel_id,
        })
    }

    onCloseModalRemove = () => {
        this.setState({ modalRemove: false });
    };

    onClickRemove = (event) => {
        event.preventDefault();
        const hotelID = this.state.hotel_id
        axios.delete(`http://127.0.0.1:8000/hotels/${hotelID}/`)
        .then(res => {
            alert("Hotel eliminado")
            window.location.reload();
        })
        .catch(error => {
            console.log("Error in remove hotel")
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
                title: <b>Nombre</b>,
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
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
                title: <b>Número de camas</b>,
                dataIndex: 'number_beds',
                key: 'number_beds',
                sorter: (a, b) => a.number_beds - b.number_beds,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Desayuno</b>,
                dataIndex: 'breakfast',
                key: 'breakfast',
                render: breakfast => {
                    if (breakfast === true) {
                        return (
                            <Tag color={'green'} key={breakfast}>
                                SI
                            </Tag>
                        )
                    } 
                    else {
                        return(
                            <Tag color={'red'} key={breakfast}>
                                NO
                            </Tag>
                        )
                    }
                }  
            },
            {
                title: <b>Precio</b>,
                dataIndex: 'total_price',
                key: 'total_price',
                sorter: (a, b) => a.total_price - b.total_price,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Precio pagado</b>,
                dataIndex: 'amount_paid',
                key: 'amount_paid',
                sorter: (a, b) => a.amount_paid - b.amount_paid,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Precio por pagar</b>,
                dataIndex: 'amount_not_paid',
                key: 'amount_not_paid',
                sorter: (a, b) => a.amount_not_paid - b.amount_not_paid,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Accion</b>,
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
                    <h1><center>Agregar hotel</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClickCreate.bind(this)} >
                        <Form.Item label="Nombre">
                            <Input name="name"
                            onChange={(e) => {
                                this.setState({
                                    name: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Numero de camas">
                            <Input name="number_beds"
                            onChange={(e) => {
                                this.setState({
                                    number_beds: e.target.value
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
                        <Form.Item label="Desayuno">
                            <Checkbox
                            onChange={(e) =>
                                this.setState({
                                    breakfast: !this.state.breakfast
                                })
                            }></Checkbox>
                        </Form.Item>
                        <Form.Item label="Precio">
                            <Input name="total_price"
                            onChange={(e) => {
                                this.setState({
                                    total_price: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Monto pagado">
                            <Input name="amount_paid"
                            onChange={(e) => {
                                this.setState({
                                    amount_paid: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Monto no pagado">
                            <Input name="amount_not_paid"
                            onChange={(e) => {
                                this.setState({
                                    amount_not_paid: e.target.value
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
                        <Form.Item label="Nombre">
                            <Input name="name"
                            value={this.state.name}
                            onChange={(e) => {
                                this.setState({
                                    name: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Numero de camas">
                            <Input name="number_beds"
                            value={this.state.number_beds}
                            onChange={(e) => {
                                this.setState({
                                    number_beds: e.target.value
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
                        <Form.Item label="Desayuno">
                            <Checkbox
                            value={this.state.breakfast}
                            onChange={(e) =>
                                this.setState({
                                    breakfast: !this.state.breakfast
                                })
                            }></Checkbox>
                        </Form.Item>
                        <Form.Item label="Precio">
                            <Input name="total_price"
                            value={this.state.total_price}
                            onChange={(e) => {
                                this.setState({
                                    total_price: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Monto pagado">
                            <Input name="amount_paid"
                            value={this.state.amount_paid}
                            onChange={(e) => {
                                this.setState({
                                    amount_paid: e.target.value
                                })
                            }} />
                        </Form.Item>
                        <Form.Item label="Monto no pagado">
                            <Input name="amount_not_paid"
                            value={this.state.amount_not_paid}
                            onChange={(e) => {
                                this.setState({
                                    amount_not_paid: e.target.value
                                })
                            }} />
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
                    <h2><center>¿ Desea eliminar el hotel seleccionado ?</center></h2>
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
                <Link to={`/trips/${this.props.data.tripID}/cities/`}>
                    <Button negative style={{marginLeft: "1%", marginTop: "60px", marginBottom: "1%"}}>
                        <Icon name="angle left" />
                        Volver
                    </Button>
                </Link>
                <h1 style={{ marginTop: -20, textAlign:"center" }}>
                    Hoteles
                </h1>
                <Row>
                    <Button primary size={'small'} style={{ position:"absolute" ,right: "1%", top: "-22px"}} onClick={(e)=> this.onOpenModalCreate(e)}>
                        Agregar Hotel
                    </Button>
                </Row>
                <Table style={{margin: "1%"}} columns={columns} dataSource={this.props.data.hotels} />
            </div>
        )
    }
};