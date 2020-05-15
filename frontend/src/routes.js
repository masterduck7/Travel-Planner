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
import CostView from './Containers/CostView';
import MapView from './Containers/MapView';
import StatisticsView from './Containers/StatisticsView';
import SkyScannerView from './Containers/SkyScannerView';
import ProfileView from './Containers/ProfileView';
import TripListPastView from './Containers/TripListPastView';
import TripListFutureView from './Containers/TripListFutureView';
import TripListCancelledView from './Containers/TripListCancelledView';
import TripCreateView from './Containers/TripCreateView';
import FlightCreateView from './Containers/FlightCreateView';

const BaseRouter = () => (
    <div>
        <HashRouter basename='/'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/profile' component={ProfileView} />
                <Route exact path='/trips' component={TripListView} />
                <Route exact path='/trips/:tripID' component={TripDetailView} />
                <Route exact path='/past-trips' component={TripListPastView} />
                <Route exact path='/active-trips' component={TripListFutureView} />
                <Route exact path='/cancelled-trips' component={TripListCancelledView} />
                <Route exact path='/create-trip' component={TripCreateView} />
                <Route exact path='/flights' component={FlightListView} />
                <Route exact path='/create-flight' component={FlightCreateView} />
                <Route exact path='/hotels' component={HotelListView} />
                <Route exact path='/cities' component={CityListView} />
                <Route exact path='/activities' component={ActivityListView} />
                <Route exact path='/costs' component={CostView} />
                <Route exact path='/map' component={MapView} />
                <Route exact path='/statistics' component={StatisticsView} />
                <Route exact path='/skyscanner' component={SkyScannerView} />
            </Switch>
        </HashRouter>
    </div>
);

export default BaseRouter;