import React, { Component } from 'react';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Icon, Input, Menu, Row, Table, Tag } from 'antd';
import {Link} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import moment from 'moment';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'

export default class ActivityList extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalCreate: false,
            modalEdit: false,
            modalRemove: false,
            activity_id: "",
            name: "",
            activity_date: moment().format("YYYY-MM-DD"),
            total_price: "",
            amount_paid: "",
            amount_not_paid: ""
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
            activity_date: event.target.activity_date.value,
            total_price: event.target.total_price.value,
            amount_paid: event.target.amount_paid.value,
            amount_not_paid: event.target.amount_not_paid.value
        }
        axios.post(`http://127.0.0.1:8000/activities/`, postObj)
        .then(function (response) {
            alert("Actividad agregada")
            window.location.reload();
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }

    onOpenModalEdit = (record) => {
        this.setState({ 
            modalEdit: true,
            activity_id: record.activity_id,
            name: record.name,
            activity_date: record.activity_date,
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
        const activityID = this.state.activity_id
        const activityObj = {
            city: this.props.data.cityID,
            name: this.state.name,
            activity_date: this.state.activity_date,
            total_price: this.state.total_price,
            amount_paid: this.state.amount_paid,
            amount_not_paid: this.state.amount_not_paid
        }
        axios.put(`http://127.0.0.1:8000/activities/${activityID}/`, activityObj)
        .then((response) => {
            alert("Actividad editada")
            window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    onOpenModalRemove = (event, item) => {
        event.preventDefault();
        this.setState({
            modalRemove: true,
            activity_id: item.activity_id,
        })
    }

    onCloseModalRemove = () => {
        this.setState({ modalRemove: false });
    };

    onClickRemove = (event) => {
        event.preventDefault();
        const activityID = this.state.activity_id
        axios.delete(`http://127.0.0.1:8000/activities/${activityID}/`)
        .then(res => {
            alert("Actividad eliminada")
            window.location.reload();
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
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name',
                render: name => <a>{name}</a>,
            },
            {
                title: 'Fecha',
                dataIndex: 'activity_date',
                key: 'activity_date',
                render: activity_date => <a>{activity_date}</a>,
            },
            {
                title: 'Precio',
                dataIndex: 'total_price',
                key: 'total_price',
                render: total_price => <a>{total_price}</a>,
            },
            {
                title: 'Precio pagado',
                dataIndex: 'amount_paid',
                key: 'amount_paid',
                render: amount_paid => <a>{amount_paid}</a>,
            },
            {
                title: 'Precio por pagar',
                dataIndex: 'amount_not_paid',
                key: 'amount_not_paid',
                render: amount_not_paid => <a>{amount_not_paid}</a>,
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
                    <h1><center>Agregar actividad</center></h1>
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
                        <Form.Item label="Fecha">
                            <DatePicker name="activity_date" placeholder="Ingrese fecha" format='YYYY-MM-DD'
                            value={moment(this.state.activity_date)}
                            onChange={(value) => {
                                this.setState({
                                    activity_date: moment(value).format('YYYY-MM-DD')
                                })
                            }}/>
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
                            <Button type="primary" htmlType="submit">
                                Agregar
                            </Button>
                        </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Modal open={this.state.modalEdit} onClose={this.onCloseModalEdit} classNames={{modal: 'customModal'}} center>
                    <h1><center>Editar actividad</center></h1>
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
                        <Form.Item label="Fecha">
                            <DatePicker name="activity_date" placeholder="Ingrese fecha" format='YYYY-MM-DD'
                            value={moment(this.state.activity_date)}
                            onChange={(value) => {
                                this.setState({
                                    activity_date: moment(value).format('YYYY-MM-DD')
                                })
                            }}/>
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
                            <Button type="primary" htmlType="submit">
                                Editar
                            </Button>
                        </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Modal open={this.state.modalRemove} onClose={this.onCloseModalRemove} classNames={{modal: 'customSmallModal'}} center>
                    <h2><center>¿ Desea eliminar la actividad seleccionada ?</center></h2>
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
                                <Link to={{ pathname:`/trips/${this.props.data.tripID}/cities/` }}></Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={19} sm={17} md={17} lg={17} xl={19}>
                    <Row>
                        <Col span={22}></Col>
                        <Col span={2}>
                            <Button type="primary" size={'small'} style={{top: 10}} onClick={(e)=> this.onOpenModalCreate(e)}>
                                Agregar Actividad
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <Table columns={columns} dataSource={this.props.data.activities} />
                </Col>
                </Row>
            </div>
        )
    }
};