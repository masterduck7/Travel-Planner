import React, { Component } from "react";
import DemoNavBar from '../../Components/Demo/DemoNavBar'
import moment from 'moment';
import {Link} from 'react-router-dom';
import { Table } from 'antd';
import { Icon, Grid, Statistic } from 'semantic-ui-react';

export default class DemoHome extends Component {

    constructor(props){
        super(props)
        this.state = {
            nextTrips : [
                {destination: 'Paris', start_date: '2021-01-01', end_date: '2021-01-08', trip_id: 1},
                {destination: 'Barcelona', start_date: '2021-02-01', end_date: '2021-02-08', trip_id: 1},
                {destination: 'Madrid', start_date: '2021-03-01', end_date: '2021-03-08', trip_id: 1},
                {destination: 'Reykjavik', start_date: '2021-04-01', end_date: '2021-04-08', trip_id: 1},
                {destination: 'Buenos Aires', start_date: '2021-05-01', end_date: '2021-05-08', trip_id: 1},
                {destination: 'New York', start_date: '2021-06-01', end_date: '2021-06-08', trip_id: 1},
                {destination: 'Santiago', start_date: '2021-07-01', end_date: '2021-07-08', trip_id: 1}
            ],
            number_countries: 5,
            number_trips : 5,
            number_flights : 10,
            number_cities : 8,
            number_hotel_nights : 30,
            number_activities : 25,
            totalYear: 3500,
            badge_total_year: 'USD'
        }
    }
    render() {

        const columnNextTrips = [
            {
                title: <b>Destino</b>,
                dataIndex: 'destination',
                key: 'destination'
            },
            {
                title: <b>Fecha Inicio</b>,
                dataIndex: 'start_date',
                key: "start_date",
                defaultSortOrder: 'ascend',
                render: start_date => moment(start_date).format("DD-MM-YYYY")
            },
            {
                title: <b>Fecha Fin</b>,
                dataIndex: 'end_date',
                key: "end_date",
                render: end_date => moment(end_date).format("DD-MM-YYYY"),
            },
            {
                title: <b>Informacion</b>,
                dataIndex: 'trip_id',
                key: "trip_id",
                render: trip_id => <Link to = {`/demo/trips/${trip_id}`}>Ir a detalles</Link>,
            }
        ]

        return  (
            <div>
                <DemoNavBar/>
                <Grid style={{margin: "1%", marginTop: "60px"}} columns={2} divided >
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <h1 style={{textAlign: 'center', marginTop: 20}}>Bienvenido usuario</h1>
                            <Statistic.Group style={{marginTop: 30}} size={"tiny"} widths='1' color="grey" >
                                <Statistic>
                                    <Statistic.Value>
                                        {this.state.badge_total_year} {this.state.totalYear}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Total gastado este año</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <br /><br /><br /><br />
                            <Statistic.Group size={"tiny"} widths='3' color="grey" >
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='world' /> {this.state.number_trips}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Viajes</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        {this.state.number_countries}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Paises</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        {this.state.number_cities}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Ciudades</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            <br /><br /><br /><br />
                            <Statistic.Group size={"tiny"} widths='2' color="grey" >
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='hotel' /> {this.state.number_hotel_nights}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Noches de hotel</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='futbol' /> {this.state.number_activities}
                                    </Statistic.Value>
                                    <br />
                                    <Statistic.Label>Actividades</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <h1 style={{textAlign: 'center', marginTop: 20}}>Siguientes 7 viajes</h1>
                            <Table style={{marginTop: 30}} pagination={false} columns={columnNextTrips} dataSource={this.state.nextTrips} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};