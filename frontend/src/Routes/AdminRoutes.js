/**
 *
 * AdminRoutes
 *
 */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import CryptoJS from "crypto-js";

// Utils

const decrypt = (value) => {
  if (value) {
      var bytes  = CryptoJS.AES.decrypt(value.toString(), process.env.REACT_APP_HASH);
      var response = bytes.toString(CryptoJS.enc.Utf8);
      return response    
  }else{
      return null
  }
}

const AdminRoutes = ({ component: Component, ...rest }) => {  
  var session_token=localStorage.getItem('token')
  var userLevel=decrypt(localStorage.getItem('user_level'))
  return (
    <Route {...rest} render={props => (
        (session_token !== null && Number(userLevel) === 10) ? (
        < Component  {...props} />
        ) : (
            <Redirect to={{
                pathname: '/blocked',
                state: { from: props.location }
            }}/>
            )
      )} 
    />
  )
};


export default AdminRoutes;