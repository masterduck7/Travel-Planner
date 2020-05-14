import React, { Component } from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import CustomLayout from '../Components/CustomLayout'


const { Option } = Select;

export default class TripEditView extends Component {

    constructor(props){
        super(props)
        this.state = {
            tripID: null,
            destination: "",
            planning_file: "",
            status: "",
            start_date: "",
            end_date: ""
        }
    }
    
    componentDidMount(){
        const tripID = this.props.match.params.tripID;
        axios.get(`http://127.0.0.1:8000/trips/${tripID}/`)
            .then(res => {
                this.setState({
                    destination: res.data.destination,
                    planning_file: res.data.planning_file,
                    status: res.data.status,
                    start_date: res.data.start_date,
                    end_date: res.data.end_date,
                    tripID: tripID
                })
            })
    }

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
        .then(function (response) {
            console.log(response)
            window.location.href = "/#/trips"
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

        return(
            <div>
                <CustomLayout />
                <center><h1>Agregar viaje</h1></center>
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


            </div>
        )
    }
};