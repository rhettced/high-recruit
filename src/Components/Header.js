import React, {Component} from 'react';
import './Header.css';
import { connect } from 'react-redux';
import Axios from 'axios';
import {clearUser} from '../Redux/player_reducer';
import {clearRecruiter} from '../Redux/recruiter_reducer';

class Header extends Component{

    logoutUser = () =>{
        Axios.post(`/api/logout`)
        .then(res =>{
            //console.log(res.data)
            this.props.clearUser();
            this.props.clearRecruiter();    
        })
    }

    render(){
        return(
            <header className='header-app'>
                <div className='HR-header'>
                    <img src='https://st2.depositphotos.com/5943796/11381/v/950/depositphotos_113815596-stock-illustration-initial-letter-hr-red-swoosh.jpg'
                    className='header-logo' alt='logo'/>
                    <h1>HighRecruits</h1>
                    <button onClick={this.logoutUser}> Logout </button>
                </div>
            </header>
        );
    }
}

export default connect(null,{clearUser,clearRecruiter})(Header);