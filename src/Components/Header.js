import React, {Component} from 'react';
import './Header.scss';
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
                    <div className='header-leftside'>
                        <h2 className='header-logo'>HR</h2>
                        <h1>HighRecruits</h1>
                    </div>
                    <button onClick={this.logoutUser}> Logout </button>
                </div>
            </header>
        );
    }
}

export default connect(null,{clearUser,clearRecruiter})(Header);