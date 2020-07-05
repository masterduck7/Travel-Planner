import React, { Component } from 'react';
import { Row, Table, Tag } from 'antd';
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import moment from 'moment';
import 'react-responsive-modal/styles.css';
import '../../Assets/styles.css'

export default class DemoTripList extends Component {

    constructor(props){
        super(props)
        this.state = {
            status: "",
            planning_file: "",
            start_date: moment().format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD")
        }
    }

    render() {
        const columns = [
            {
                title: <b>Destino</b>,
                dataIndex: 'destination',
                key: 'destination',
                sorter: (a, b) => a.destination.length - b.destination.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Fecha Inicio</b>,
                dataIndex: 'start_date',
                key: 'start_date',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => moment(a.start_date).diff(moment(b.start_date), 'days'),
                sortDirections: ['ascend','descend'],
                render: start_date => moment(start_date).format("DD-MM-YYYY")
            },
            {
                title: <b>Fecha Fin</b>,
                dataIndex: 'end_date',
                key: "end_date",
                sorter: (a, b) => moment(a.end_date).diff(moment(b.end_date), 'days'),
                sortDirections: ['ascend','descend'],
                render: end_date => moment(end_date).format("DD-MM-YYYY")
            },
            {
                title: <b>Estado</b>,
                dataIndex: 'status',
                key: 'status',
                sorter: (a, b) => a.status.length - b.status.length,
                sortDirections: ['ascend','descend'],
                render: status => {
                    if (status === "Active") {
                        return (
                            <Tag color={'green'} key={status}>
                                FUTURO
                            </Tag>
                        )
                    } 
                    else if (status === "Cancelled") {
                        return(
                            <Tag color={'red'} key={status}>
                                CANCELADO
                            </Tag>
                        )
                    }
                    else {
                        return(
                            <Tag color={'gray'} key={status}>
                                PASADO
                            </Tag>
                        )
                    }
                }                    
            },
            {
                title: <b>Archivo planificación</b>,
                dataIndex: 'planning_file',
                key: 'planning_file',
                sorter: (a, b) => a.planning_file.length - b.planning_file.length,
                sortDirections: ['ascend','descend']
            },
            {
                title: <b>Informacion</b>,
                key: 'action',
                render: (text, item) => (
                  <span>
                    <Link to={`/demo/trips/1`}>Ir a detalles</Link>
                  </span>
                ),
            }
        ]
        return(
            <div>
                <Row>
                    <Button.Group style={{marginLeft: "1%", marginTop: "60px", marginBottom: "1%"}} size={"medium"}>
                        <Button disabled primary>
                                Todos
                        </Button>
                        <Button disabled primary>
                                Pasados
                        </Button>
                        <Button disabled primary>
                                Cancelados
                        </Button>
                        <Button disabled primary>
                                Futuros
                        </Button>
                    </Button.Group>
                </Row>
                <br />
                <h1 style={{ marginTop: -20, textAlign:"center" }}>
                    {this.props.data.type}
                </h1>
                <br />
                <Row>
                    <Button primary size={'small'} style={{ position:"absolute" ,right: "1%", top: "-22px"}} disabled>
                        Agregar viaje
                    </Button>
                </Row>
                <Table style={{margin: "1%"}} columns={columns} dataSource={this.props.data.trips} />
            </div>
        )
    }
};