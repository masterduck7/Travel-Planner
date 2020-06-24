import React from 'react';
import { HashRouter, Route,Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes'
import HomeView from './Containers/HomeView';
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
import LoginView from './Containers/LoginView';
import RegisterView from './Containers/RegisterView';
import LayoutView from './Containers/LayoutView';

const BaseRouter = () => (
    <div>
        <HashRouter basename='/'>
            <Switch>
                <Route exact path='/' component={LayoutView} />
                <Route exact path='/login' component={LoginView} />
                <Route exact path='/register' component={RegisterView} />
                <PrivateRoutes exact path='/home' component={props => <HomeView {...props}/>} />
                <PrivateRoutes exact path='/map' component={props => <MapView {...props}/>} />
                <PrivateRoutes exact path='/profile' component={props => <ProfileView {...props}/>} />
                <PrivateRoutes exact path='/calendar' component={props => <CalendarView {...props}/>} />
                <PrivateRoutes exact path='/statistics' component={props => <StatisticsView {...props}/>} />
                <PrivateRoutes exact path='/skyscanner' component={props => <SkyScannerView {...props}/>} />
                <PrivateRoutes exact path='/trips' component={props => <TripListView {...props}/>} />
                <PrivateRoutes exact path='/past-trips' component={props => <TripListPastView {...props}/>} />
                <PrivateRoutes exact path='/active-trips' component={props => <TripListFutureView {...props}/>} />
                <PrivateRoutes exact path='/cancelled-trips' component={props => <TripListCancelledView {...props}/>} />
                <PrivateRoutes exact path='/trips/:tripID' component={props => <TripDetailView {...props}/>} />
                <PrivateRoutes exact path='/trips/:tripID/costs' component={props => <CostView {...props}/>} />
                <PrivateRoutes exact path='/trips/:tripID/flights' component={props => <FlightListView {...props}/>} />
                <PrivateRoutes exact path='/trips/:tripID/cities' component={props => <CityListView {...props}/>} />
                <PrivateRoutes exact path='/trips/:tripID/cities/:cityID/hotels' component={props => <HotelListView {...props}/>} />
                <PrivateRoutes exact path='/trips/:tripID/cities/:cityID/activities' component={props => <ActivityListView {...props}/>} />
                <PrivateRoutes exact path='/trips/:tripID/cities/:cityID/city-costs' component={props => <CityCostView {...props}/>} />
            </Switch>
        </HashRouter>
    </div>
);

export default BaseRouter;