import React, { Component } from 'react';
import './App.css';
import BaseRouter from './Routes/index';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <BaseRouter />
    );
  }
}

export default App;
