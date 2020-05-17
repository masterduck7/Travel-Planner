import React, { Component } from 'react';
import { Button, Col, Divider, Form, Icon, Input, Menu, Row, Table } from 'antd';
import {Link} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'

export default class CityList extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalCreate: false,
            modalEdit: false,
            modalRemove: false,
            city_id: "",
            name: "",
            map_link: ""
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
            name: event.target.name.value,
            map_link: event.target.map_link.value
        }
        axios.post(`http://127.0.0.1:8000/cities/`, postObj)
        .then(function (response) {
            alert("Ciudad agregada")
            window.location.href = "/#/trips"
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }

    onOpenModalEdit = (record) => {
        this.setState({ 
            modalEdit: true,
            city_id: record.city_id,
            name: record.name,
            map_link: record.map_link
        });
    };

    onCloseModalEdit = () => {
        this.setState({ modalEdit: false });
    };

    onClickEdit = event => {
        event.preventDefault();
        const cityID = this.state.city_id
        const cityObj = {
            trip: this.props.data.tripID,
            name: this.state.name,
            map_link: this.state.map_link
        }
        axios.put(`http://127.0.0.1:8000/cities/${cityID}/`, cityObj)
        .then((response) => {
            alert("Ciudad editada")
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
            city_id: item.city_id,
        })
    }

    onCloseModalRemove = () => {
        this.setState({ modalRemove: false });
    };

    onClickRemove = (event) => {
        event.preventDefault();
        const cityID = this.state.city_id
        axios.delete(`http://127.0.0.1:8000/cities/${cityID}/`)
        .then(res => {
            alert("Ciudad eliminada")
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
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name',
                render: name => <a>{name}</a>,
            },
            {
                title: 'Mapa',
                dataIndex: 'map_link',
                key: 'map_link',
                render: map_link => <a>{map_link}</a>,
            },
            {
                title: 'Detalles',
                dataIndex: 'city_id',
                key: 'city_id',
                render: city_id => (
                    <span>
                        <Button>
                            <Link to={{ pathname:"/hotels", state: { tripID: this.props.data.tripID, cityID: city_id } }} >
                                Hoteles
                            </Link>
                        </Button>
                        <Divider type="vertical" />
                        <Button>
                            <Link to={{ pathname:"/activities", state: { tripID: this.props.data.tripID, cityID: city_id } }} >
                                Actividades
                            </Link>
                        </Button>
                    </span>
                ),
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
                    <h1><center>Agregar ciudad</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClickCreate.bind(this)} >
                        <Form.Item label="Nombre">
                            <Input name="name" type="text" value={this.state.name} 
                            onChange={(e) => {
                                this.setState({
                                    name: e.target.value
                                })
                            }}/>
                        </Form.Item>
                        <Form.Item label="Link a mapa">
                            <Input name="map_link" type="text" value={this.state.map_link} 
                            onChange={(e) => {
                                this.setState({
                                    map_link: e.target.value
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
                <Modal open={this.state.modalEdit} onClose={this.onCloseModalEdit} classNames={{modal: 'customModal'}} center>
                    <h1><center>Editar ciudad</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClickEdit.bind(this)} >
                        <Form.Item label="Nombre">
                            <Input name="name" type="text" value={this.state.name} 
                            onChange={(e) => {
                                this.setState({
                                    name: e.target.value
                                })
                            }}/>
                        </Form.Item>
                        <Form.Item label="Link a mapa">
                            <Input name="map_link" type="text" value={this.state.map_link} 
                            onChange={(e) => {
                                this.setState({
                                    map_link: e.target.value
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
                    <h2><center>¿ Desea eliminar la ciudad seleccionada ?</center></h2>
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
                        <Col span={21}></Col>
                        <Col span={2}>
                            <Button type="primary" size={'small'} style={{top: 10}} 
                                onClick={(e) => this.onOpenModalCreate(e)}>
                                Agregar Ciudad
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <Table columns={columns} dataSource={this.props.data.cities} />
                </Col>
                </Row>
            </div>
        )
    }
};