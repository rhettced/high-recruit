import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import Header from './Components/Header';
import Auth from './Components/Auth';
import PlayerView from './Components/PlayerView';
import RecruiterView from './Components/RecruiterView';
import SinglePLayer from './Components/SinglePlayer';
import routes from './routes';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Header/>
        {/* <Auth/>
        <PlayerView/>
        <RecruiterView/>
        <SinglePLayer/> */}
        {routes}
      </div>
    );
  }
}

export default App;
