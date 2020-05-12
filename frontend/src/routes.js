import React from 'react';
import {Route,Switch} from 'react-router-dom';
import { HashRouter } from 'react-router-dom'; 
import Home from './Containers/Home';
import TripListView from './Containers/TripListView';
import TripDetailView from './Containers/TripDetailView';
import FlightListView from './Containers/FlightListView';
import HotelListView from './Containers/HotelListView';
import CityListView from './Containers/CityListView';

const BaseRouter = () => (
    <div>
        <HashRouter basename='/'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/trips' component={TripListView} />
                <Route exact path='/trips/:tripID' component={TripDetailView} />
                <Route exact path='/flights' component={FlightListView} />
                <Route exact path='/hotels' component={HotelListView} />
                <Route exact path='/cities' component={CityListView} />
            </Switch>
        </HashRouter>
    </div>
);

export default BaseRouter;