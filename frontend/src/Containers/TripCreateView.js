import React, { Component } from 'react';
import axios from 'axios';
import { Input } from 'antd';

class TripCreateView extends Component {

    onClick = event => {
        const postObj = {
            destination: event.target.destination.value,
            planning_file: event.target.planning_file.value,
            start_date: event.target.start_date.value,
            end_date: event.target.end_date.value
        }
        axios.post(`http://127.0.0.1:8000/trips/`, postObj)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.onClick.bind(this)}>
                <label>
                    <input name="destination" />
                </label>
                <label>
                    <Input name="planning_file" />
                </label>
                <label>
                    <Input name="start_date" type="date" />
                </label>
                <label>
                    <Input name="end_date" type="date" />
                </label>
                <input type="submit" />
                </form>
            </div>
        )
    }
};

export default TripCreateView;