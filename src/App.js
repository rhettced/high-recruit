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
import Axios from 'axios';
import {connect} from 'react-redux'
import {getUser} from './Redux/player_reducer';
import {getRecruiter} from './Redux/recruiter_reducer';

class App extends Component {
  componentDidMount(){
    Axios.get('/api/session')
    .then(res => {
      console.log(res.data);
      if(res.data.player_id) {
        this.props.getUser(res.data)
      } else{
        this.props.getRecruiter(res.data)
      }
    })
  }
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
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps,{getUser,getRecruiter})(App);
