import React from 'react';
import {Route,Switch} from 'react-router-dom';
import { HashRouter } from 'react-router-dom'; 
import Home from './Containers/Home';
import TripListView from './Containers/TripListView';
import TripDetailView from './Containers/TripDetailView';
import FlightListView from './Containers/FlightListView';
import HotelListView from './Containers/HotelListView';
import CityListView from './Containers/CityListView';
import ActivityListView from './Containers/ActivityListView';
import CityCostView from './Containers/CityCostsView';
import CostView from './Containers/CostView';
import MapView from './Containers/MapView';
import StatisticsView from './Containers/StatisticsView';
import SkyScannerView from './Containers/SkyScannerView';
import ProfileView from './Containers/ProfileView';
import TripListPastView from './Containers/TripListPastView';
import TripListFutureView from './Containers/TripListFutureView';
import TripListCancelledView from './Containers/TripListCancelledView';
import CalendarView from './Containers/CalendarView';

const BaseRouter = () => (
    <div>
        <HashRouter basename='/'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/map' component={MapView} />
                <Route exact path='/profile' component={ProfileView} />
                <Route exact path='/calendar' component={CalendarView} />
                <Route exact path='/statistics' component={StatisticsView} />
                <Route exact path='/skyscanner' component={SkyScannerView} />
                <Route exact path='/trips' component={TripListView} />
                <Route exact path='/past-trips' component={TripListPastView} />
                <Route exact path='/active-trips' component={TripListFutureView} />
                <Route exact path='/cancelled-trips' component={TripListCancelledView} />
                <Route exact path='/trips/:tripID' component={TripDetailView} />
                <Route exact path='/trips/:tripID/costs' component={CostView} />
                <Route exact path='/trips/:tripID/flights' component={FlightListView} />
                <Route exact path='/trips/:tripID/cities' component={CityListView} />
                <Route exact path='/trips/:tripID/cities/:cityID/hotels' component={HotelListView} />
                <Route exact path='/trips/:tripID/cities/:cityID/activities' component={ActivityListView} />
                <Route exact path='/trips/:tripID/cities/:cityID/city-costs' component={CityCostView} />
            </Switch>
        </HashRouter>
    </div>
);

export default BaseRouter;