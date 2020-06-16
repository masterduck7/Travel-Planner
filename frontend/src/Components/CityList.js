import React, { Component } from 'react';
import { Divider, Form, Input, Row, Select, Table } from 'antd';
import { Button, Flag, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'

const { getNameList } = require('country-list');

export default class CityList extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalCreate: false,
            modalEdit: false,
            modalRemove: false,
            city_id: "",
            name: "",
            country: "",
            map_link: "",
            country_list: getNameList()
        }
    }

    onOpenModalCreate(e){
        this.setState({ 
            modalCreate: true,
            city_id: "",
            name: "",
            country: "",
            map_link: ""
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
            country: this.state.country,
            map_link: event.target.map_link.value
        }
        axios.post(`http://127.0.0.1:8000/cities/`, postObj)
        .then(function (response) {
            alert("Ciudad agregada")
            window.location.reload();
        })
        .catch(function (error) {
          console.log("Error in add city");
        });
    }

    onOpenModalEdit = (record) => {
        this.setState({ 
            modalEdit: true,
            city_id: record.city_id,
            name: record.name,
            country: record.country,
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
            country: this.state.country,
            map_link: this.state.map_link
        }
        axios.put(`http://127.0.0.1:8000/cities/${cityID}/`, cityObj)
        .then((response) => {
            alert("Ciudad editada")
            window.location.reload();
        })
        .catch(function (error) {
          console.log("Error in edit city");
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
            window.location.reload();
        })
        .catch(error => {
            console.log("Error in remove city")
        })
    }
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                title: <b>Pais</b>,
                dataIndex: 'country',
                key: 'country',
                render: country => {
                    let countryName = Object.keys(this.state.country_list).find(key => this.state.country_list[key] === country)
                    let countryNameCapitalized = this.capitalizeFirstLetter(countryName)
                    return(
                        <span>
                            <Flag name={country.toLowerCase()} /> {countryNameCapitalized}
                        </span>
                    )
                }
            },
            {
                title: <b>Mapa</b>,
                dataIndex: 'map_link',
                key: 'map_link',
                sorter: (a, b) => a.map_link.length - b.map_link.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Detalles</b>,
                dataIndex: 'city_id',
                key: 'city_id',
                render: city_id => (
                    <span>
                        <Link to={{ pathname:`/trips/${this.props.data.tripID}/cities/${city_id}/hotels` }}>
                            <Button basic color="black">
                                Hoteles
                            </Button>
                        </Link>
                        <Divider type="vertical" />
                        <Link to={{ pathname:`/trips/${this.props.data.tripID}/cities/${city_id}/activities` }}>
                            <Button basic color="black">
                                Actividades
                            </Button>
                        </Link>
                        <Divider type="vertical" />
                        <Link to={{ pathname:`/trips/${this.props.data.tripID}/cities/${city_id}/city-costs` }}>
                            <Button basic color="black">
                                Gastos
                            </Button>
                        </Link>
                    </span>
                ),
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

        const countryOptions = Object.keys(this.state.country_list).map(key => 
            <option value={this.state.country_list[key]}>{this.capitalizeFirstLetter(key)}</option>
        )

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
                        <Form.Item label="Pais">
                            <Select name="country" placeholder="Por favor seleccione el pais a viajar"
                            onChange={(value) => {
                                this.setState({
                                    country: value
                                })
                            }}>
                                {countryOptions}
                            </Select>
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
                            <Button primary htmlType="submit">
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
                        <Form.Item label="Pais">
                            <Select name="country" placeholder="Por favor seleccione el pais a viajar"
                            value = {this.state.country}
                            onChange={(value) => {
                                this.setState({
                                    country: value
                                })
                            }}>
                                {countryOptions}
                            </Select>
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
                            <Button primary htmlType="submit">
                                Editar
                            </Button>
                        </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Modal open={this.state.modalRemove} onClose={this.onCloseModalRemove} classNames={{modal: 'customSmallModal'}} center>
                    <h2><center>¿ Desea eliminar la ciudad seleccionada ?</center></h2>
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
                    <Button negative style={{marginLeft: "1%", marginTop: "1%", marginBottom: "1%"}}>
                        <Icon name="angle left" />
                        Volver
                    </Button>
                </Link>
                <h1 style={{ marginTop: -20, textAlign:"center" }}>
                    Ciudades
                </h1>
                <Row>
                    <Button primary size={'small'} style={{ position:"absolute" ,right: "1%", top: "-22px"}} onClick={(e)=> this.onOpenModalCreate(e)}>
                        Agregar Ciudad
                    </Button>
                </Row>
                <Table style={{margin: "1%"}} columns={columns} dataSource={this.props.data.cities} />
            </div>
        )
    }
};