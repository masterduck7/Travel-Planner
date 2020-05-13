import React, { Component } from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import CustomLayout from '../Components/CustomLayout'


const { Option } = Select;

export default class TripCreateView extends Component {

    constructor(props){
        super(props)
        this.state = {
            status: ""
        }
    }

    onClick = event => {
        event.preventDefault();
        const postObj = {
            destination: event.target.destination.value,
            planning_file: event.target.planning_file.value,
            status: this.state.status,
            start_date: event.target.start_date.value,
            end_date: event.target.end_date.value
        }
        axios.post(`http://127.0.0.1:8000/trips/`, postObj)
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
                        <Input name="destination" />
                    </Form.Item>
                    <Form.Item label="Archivo Excel">
                        <Input name="planning_file" placeholder="Link a archivo en Google Drive" />
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
                        <DatePicker name="start_date" placeholder="Ingrese fecha" format='YYYY-MM-DD' />
                    </Form.Item>
                    <Form.Item label="Fecha Fin">
                        <DatePicker name="end_date" placeholder="Ingrese fecha" format='YYYY-MM-DD' />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Agregar
                        </Button>
                    </Form.Item>
                </Form>


            </div>
        )
    }
};