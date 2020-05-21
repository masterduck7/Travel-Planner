import React, { Component } from 'react';
import { Divider, Form, Input, Row, Table } from 'antd';
import { Button, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'

export default class CostList extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalCreate: false,
            modalEdit: false,
            modalRemove: false,
            cost_id: "",
            name: "",
            total_price: ""
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
            total_price: event.target.total_price.value
        }
        axios.post(`http://127.0.0.1:8000/costs/`, postObj)
        .then(function (response) {
            alert("Gasto agregado")
            window.location.reload();
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }

    onOpenModalEdit = (record) => {
        this.setState({ 
            modalEdit: true,
            cost_id: record.cost_id,
            name: record.name,
            total_price: record.total_price
        });
    };

    onCloseModalEdit = () => {
        this.setState({ modalEdit: false });
    };

    onClickEdit = event => {
        event.preventDefault();
        const costID = this.state.cost_id
        const costObj = {
            city: this.props.data.cityID,
            name: this.state.name,
            total_price: this.state.total_price
        }
        axios.put(`http://127.0.0.1:8000/costs/${costID}/`, costObj)
        .then((response) => {
            alert("Gasto editado")
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
            cost_id: item.cost_id,
        })
    }

    onCloseModalRemove = () => {
        this.setState({ modalRemove: false });
    };

    onClickRemove = (event) => {
        event.preventDefault();
        const costID = this.state.cost_id
        axios.delete(`http://127.0.0.1:8000/costs/${costID}/`)
        .then(res => {
            alert("Gasto eliminado")
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
                title: <b>Nombre</b>,
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Precio</b>,
                dataIndex: 'total_price',
                key: 'total_price',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.total_price - b.total_price,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Accion</b>,
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
                    <h1><center>Agregar gasto</center></h1>
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
                        <Form.Item label="Precio">
                            <Input name="total_price"
                            onChange={(e) => {
                                this.setState({
                                    total_price: e.target.value
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
                    <h1><center>Editar gasto</center></h1>
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
                        <Form.Item label="Precio">
                            <Input name="total_price"
                            value={this.state.total_price}
                            onChange={(e) => {
                                this.setState({
                                    total_price: e.target.value
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
                    <h2><center>¿ Desea eliminar el gasto seleccionado ?</center></h2>
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
                
                <Button negative style={{marginLeft: "1%", marginTop: "1%", marginBottom: "1%"}}>
                    <Icon name="angle left" />
                    <Link style={{color:"white"}} to={`/trips/${this.props.data.tripID}/cities/`}>Volver</Link>
                </Button>
                <h1 style={{ marginTop: -20, textAlign:"center" }}>
                    Gastos
                </h1>
                <Row>
                    <Button primary size={'small'} style={{ position:"absolute" ,right: "1%", top: "-22px"}} onClick={(e)=> this.onOpenModalCreate(e)}>
                        Agregar Gasto
                    </Button>
                </Row>
                <Table style={{margin: "1%"}} columns={columns} dataSource={this.props.data.costs} />
            </div>
        )
    }
};