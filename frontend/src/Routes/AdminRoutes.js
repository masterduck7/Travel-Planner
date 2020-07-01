/**
 *
 * AdminRoutes
 *
 */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Utils

const AdminRoutes = ({ component: Component, ...rest }) => {  
  var session_token=localStorage.getItem('token')
  var user_logged=localStorage.getItem('user_logged')
  return (
    <Route {...rest} render={props => (
        (session_token !== null && user_logged === 'admin') ? (
        < Component  {...props} />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
            )
      )} 
    />
  )
};


export default AdminRoutes;