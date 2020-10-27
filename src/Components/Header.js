import React, { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import Axios from 'axios';
import { clearUser } from '../Redux/player_reducer';
import { clearRecruiter } from '../Redux/recruiter_reducer';
import { Link } from 'react-router-dom';

class Header extends Component {

    logoutUser = () => {
        Axios.post(`/api/logout`)
            .then(res => {
                //console.log(res.data)
                this.props.clearUser();
                this.props.clearRecruiter();
            })
    }

    componentDidMount() {

    }

    render() {
        return (
            <header className='header-app'>
                <div className='HR-header'>
                    <div className='header-leftside'>
                        <h2 className='header-logo'>HR</h2>
                        <h1>HighRecruits</h1>
                        
                    </div>
                    {this.props.playerReducer.player.name? <div className='auth-buttons'>
                        <Link to={`/editaccount/${this.props.playerReducer.player.player_id}`}><button>Edit Account</button></Link>
                        <button onClick={this.logoutUser}> Logout </button>
                    </div> : <button onClick={this.logoutUser}> Logout </button>}

                </div>
            </header>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps, { clearUser, clearRecruiter })(Header);