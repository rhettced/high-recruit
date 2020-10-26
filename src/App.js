import React, { Component } from 'react';
import './App.scss';
// import { render } from '@testing-library/react';
import Header from './Components/Header';
import Auth from './Components/Auth';
// import PlayerView from './Components/PlayerView';
// import RecruiterView from './Components/RecruiterView';
// import SinglePLayer from './Components/SinglePlayer';
import routes from './routes';
import Axios from 'axios';
import {connect} from 'react-redux'
import {getUser} from './Redux/player_reducer';
import {getRecruiter} from './Redux/recruiter_reducer';
import { withRouter } from 'react-router-dom';

class App extends Component {
  componentDidMount(){
    Axios.get('/api/session')
    .then(res => {
      //console.log(res.data);
      if(res.data.player_id) {
        this.props.getUser(res.data)
      } else if (res.data.recruiter_id){
        this.props.getRecruiter(res.data)
      } else{
        this.props.history.push('/');
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
        {!this.props.playerReducer.player.name && !this.props.recruiterReducer.recruiter.name && this.props.location!=='/'? <Auth/> : routes}
      </div>
    );
  }
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps,{getUser,getRecruiter})(withRouter(App));
