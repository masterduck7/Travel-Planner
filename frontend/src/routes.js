import React from 'react';
import {Route,Switch} from 'react-router-dom';
import { HashRouter } from 'react-router-dom'; 
import Home from './Containers/Home';
import TripListView from './Containers/TripListView';

const BaseRouter = () => (
    <div>
        <HashRouter basename='/'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/trips' component={TripListView} />
            </Switch>
        </HashRouter>
    </div>
);

export default BaseRouter;