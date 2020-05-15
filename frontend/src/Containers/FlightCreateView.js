import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, DatePicker, Form, Input } from 'antd';
import CustomLayout from '../Components/CustomLayout'

export default class FlightCreateView extends Component {

    constructor(props){
        super(props)
        this.state = {
            trips: [],
            trip: this.props.location.state.trip_id,
            origin: "",
            destination: "",
            start_date: moment().format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD"),
            airline_name: "",
            flight_number: "",
            price: ""
        }
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/trips/`)
            .then(res => {
                if (!res.data["Error"]) {
                    this.setState({
                        trips: res.data
                    })    
                }else{
                    this.setState({
                        trips: []
                    }) 
                }
            })
    }

    onClick = event => {
        event.preventDefault();
        const postObj = {
            trip: this.state.trip,
            origin: this.state.origin,
            destination: this.state.destination,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            airline_name: this.state.airline_name,
            flight_number: this.state.flight_number,
            price: this.state.price
        }
        axios.post(`http://127.0.0.1:8000/flights/`, postObj)
        .then(function (response) {
            console.log(response)
            window.location.href = `/#/trips/${postObj.trip}`
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
                <center><h1>Agregar Vuelo</h1></center>
                <Form {...formItemLayout} onSubmit={this.onClick.bind(this)} >
                    <Form.Item label="Origen">
                        <Input name="origin"
                        onChange={(e) => {
                            this.setState({
                                origin: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Destino">
                        <Input name="destination"
                        onChange={(e) => {
                            this.setState({
                                destination: e.target.value
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
                    <Form.Item label="Aerolinea">
                        <Input name="airline_name"
                        onChange={(e) => {
                            this.setState({
                                airline_name: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Número de vuelo">
                        <Input name="flight_number"
                        onChange={(e) => {
                            this.setState({
                                flight_number: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item label="Precio">
                        <Input name="price"
                        onChange={(e) => {
                            this.setState({
                                price: e.target.value
                            })
                        }} />
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