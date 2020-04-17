import React from 'react';
import TripListView from './Containers/TripListView'
import TripCreateView from './Containers/TripCreateView'
import './App.css';

function App() {
  return (
    <div className="App">
      <p>Hello World</p>
      <TripListView />
      <TripCreateView />
    </div>
  );
}

export default App;
