import React, { Component } from 'react';
import { Form, Input, Row, Table } from 'antd';
import { Button } from 'semantic-ui-react'
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import '../Assets/styles.css'

export default class UserList extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            userLogged: localStorage.getItem('user_logged'),
            modalCreate: false,
            modalEdit: false,
            modalRemove: false,
            user_id: "",
            username: "",
            password: "",
            email: "",
            country: "",
            visitedCountries: "",
            permissionLevel: ""
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
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email,
            "country": this.state.country,
            "visitedCountries": this.state.visitedCountries,
            "userLogged": this.state.userLogged,
            "permissionLevel": this.state.permissionLevel
        }
        axios.post(`http://travelplanner.lpsoftware.space/api/users`, postObj,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then(function (response) {
            alert("Usuario agregado")
            window.location.reload();
        })
        .catch(function (error) {
            console.log("Error in login ",error);
            alert("Este usuario ya existe")
            //window.location.reload();
        });
    }

    onOpenModalEdit = (record) => {
        this.setState({ 
            modalEdit: true,
            user_id: record.id,
            username: record.username,
            password: record.password,
            email: record.email,
            country: record.country,
            visitedCountries: record.visitedCountries,
            permissionLevel: record.permissionLevel
        });
    };

    onCloseModalEdit = () => {
        this.setState({ modalEdit: false });
    };

    onClickEdit = event => {
        event.preventDefault();
        const userID = this.state.user_id
        const userObj = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            country: this.state.country,
            visitedCountries: this.state.visitedCountries,
            permissionLevel: this.state.permissionLevel
        }
        axios.put(`http://travelplanner.lpsoftware.space/api/users/${userID}/`, userObj,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then((response) => {
            alert("Usuario editado")
            window.location.reload();
        })
        .catch(function (error) {
          console.log("Error in edit user");
        });
    }

    onOpenModalRemove = (event, item) => {
        event.preventDefault();
        this.setState({
            modalRemove: true,
            user_id: item.id,
        })
    }

    onCloseModalRemove = () => {
        this.setState({ modalRemove: false });
    };

    onClickRemove = (event) => {
        event.preventDefault();
        const userID = this.state.user_id
        axios.delete(`http://travelplanner.lpsoftware.space/api/users/${userID}/`,{
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }})
        .then(res => {
            alert("Usuario eliminado")
            window.location.reload();
        })
        .catch(error => {
            console.log("Error in remove user")
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
                title: <b>Username</b>,
                dataIndex: 'username',
                key: 'username',
                sorter: (a, b) => a.username.length - b.username.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Email</b>,
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: <b>Country</b>,
                dataIndex: 'country',
                key: "country"
            },
            {
                title: <b>Visited Countries</b>,
                dataIndex: 'visitedCountries',
                key: 'visitedCountries',
                sorter: (a, b) => a.visitedCountries.length - b.visitedCountries.length,
                sortDirections: ['ascend','descend']                 
            },
            {
                title: <b>Permission Level</b>,
                dataIndex: 'permissionLevel',
                key: 'permissionLevel',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.permissionLevel - b.permissionLevel,
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
                <h1><center>Agregar Usuario</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClickCreate.bind(this)} >
                    <Form.Item label="Username">
                        <Input name="username"
                        onChange={(e) => {
                            this.setState({
                                username: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password name="password"
                        onChange={(e) => {
                            this.setState({
                                password: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input name="email"
                        onChange={(e) => {
                            this.setState({
                                email: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Country">
                        <Input name="country"
                        onChange={(e) => {
                            this.setState({
                                country: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Visited Countries">
                        <Input name="visitedCountries"
                        onChange={(e) => {
                            this.setState({
                                visitedCountries: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Permission level">
                        <Input name="permissionLevel"
                        onChange={(e) => {
                            this.setState({
                                permissionLevel: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button primary htmlType="submit">
                            Registrar
                        </Button>
                    </Form.Item>
                    </Form>
                    </p>
                </Modal>
                <Modal open={this.state.modalEdit} onClose={this.onCloseModalEdit} classNames={{modal: 'customModal'}} center>
                <h1><center>Editar Usuario</center></h1>
                    <p>
                    <Form {...formItemLayout} onSubmit={this.onClickEdit.bind(this)} >
                    <Form.Item label="Username">
                        <Input name="username"
                        value={this.state.username}
                        onChange={(e) => {
                            this.setState({
                                username: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password name="password"
                        value={this.state.password}
                        onChange={(e) => {
                            this.setState({
                                password: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input name="email"
                        value={this.state.email}
                        onChange={(e) => {
                            this.setState({
                                email: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Country">
                        <Input name="country"
                        value={this.state.country}
                        onChange={(e) => {
                            this.setState({
                                country: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Visited Countries">
                        <Input name="visitedCountries"
                        value={this.state.visitedCountries}
                        onChange={(e) => {
                            this.setState({
                                visitedCountries: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Permission level">
                        <Input name="permissionLevel"
                        value={this.state.permissionLevel}
                        onChange={(e) => {
                            this.setState({
                                permissionLevel: e.target.value
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
                    <h2><center>¿ Desea eliminar el usuario seleccionado ?</center></h2>
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
                <Row>
                    <Button primary size={'small'} style={{ position:"absolute" ,right: "1%", top: "-22px"}} onClick={(e)=> this.onOpenModalCreate(e)}>
                        Agregar usuario
                    </Button>
                </Row>
                <Table style={{margin: "1%"}} columns={columns} dataSource={this.props.data.users} />
            </div>
        )
    }
};