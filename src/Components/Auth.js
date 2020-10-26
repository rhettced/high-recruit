import React, { Component } from 'react';
import './Auth.scss';
import Axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../Redux/player_reducer';
import { getRecruiter } from '../Redux/recruiter_reducer';
import { withRouter } from 'react-router-dom';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            toggle: 0,
            boxChecked: false,
            name: '',
            email: '',
            password: '',
            school: '',
            classYear: '',
            position: '',
            picUrl: '',
            phoneNumber: '',
        }
    }

    toggleRegister = () => {
        this.setState({ toggle: 1 })
    }
    toggleRecruiter = () => {
        this.setState({ boxChecked: !this.state.boxChecked })
    }
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    registerUser = () => {
        const { name, email, password, school, classYear, position, picUrl, phoneNumber, boxChecked } = this.state;
        if (boxChecked === false) {
            Axios.post('/api/register', { name, email, password, school, classYear, position, picUrl, phoneNumber, boxChecked })
                .then(res => {
                    //console.log(res.data)
                    this.props.getUser(res.data);
                    this.props.history.push('/profile');
                })
        } else {
            Axios.post('/api/register', { name, email, password, school, phoneNumber, boxChecked })
                .then(res => {
                    this.props.getRecruiter(res.data);
                    this.props.history.push('/recruitview');
                })
        }
    }

    loginUser = () => {
        const { email, password, boxChecked } = this.state;
        Axios.post('/api/login', { email, password, boxChecked })
            .then(res => {
                if (boxChecked === false) {
                    this.props.getUser(res.data);
                    this.props.history.push('/profile');
                } else {
                    this.props.getRecruiter(res.data);
                    this.props.history.push('/recruitview');
                }
            })
            .catch(err => alert('Wrong Username or Password'))

    }

    render() {
        //console.log(this.state.phoneNumber);
        return (
            <div className='auth-app'>
                <div>
                    {this.state.toggle === 0 ?

                        <div className='auth-default'>
                            <h2 className='auth-logo'>HR</h2>
                            <div className='login-inputs'>
                                <input placeholder='Email *' name='email' onChange={this.handleInput} />
                                <input placeholder='Password *' type='password' name='password' onChange={this.handleInput} />
                            </div>
                            <div>
                                <button onClick={this.loginUser}>Log in</button>
                                <button onClick={this.toggleRegister}>Register</button>
                                <div className='if-recruiter'>
                                    <p>Recruiter:</p>
                                    <input type='checkbox' checked={this.state.boxChecked} onChange={this.toggleRecruiter} />
                                </div>
                            </div>
                        </div> :
                        <div className='register-inputs'>
                            <p className='recruit-warning'>Recruiter fill out * only</p>
                            <input placeholder='Name *' name='name' onChange={this.handleInput} />
                            <input placeholder='Email *' name='email' onChange={this.handleInput} />
                            <input placeholder='Password *' type='password' name='password' onChange={this.handleInput} />
                            <input placeholder='School *' name='school' onChange={this.handleInput} />
                            <input placeholder='Class Year' name='classYear' onChange={this.handleInput} />
                            <input placeholder='Position' name='position' onChange={this.handleInput} />
                            <input placeholder='Profile Pic Url' name='picUrl' onChange={this.handleInput} />
                            <input placeholder='Phone Number *' type="tel" name='phoneNumber' onChange={this.handleInput} />
                            <div>
                                <button onClick={this.registerUser}>Register</button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps, { getUser, getRecruiter })(withRouter(Auth));