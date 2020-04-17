import React, { Component } from 'react';
import { List, Card } from 'antd';

class TripList extends Component {
    render() {
        console.log(this.props.data)
        return(
            <div>
                <List
                    style={{ marginLeft:"5%", marginRight:"5%" }}
                    dataSource={this.props.data}
                    renderItem={item => (
                        <List.Item>
                        <List.Item.Meta
                          title={item.destination}
                          description={item.planning_file}
                        />
                        <p>{item.start_date}</p>
                        <p>{item.end_date}</p>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
};

export default TripList;