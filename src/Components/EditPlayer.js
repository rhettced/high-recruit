import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { getUser } from '../Redux/player_reducer';
import './EditPlayer.scss';


import './RecruiterView.scss';

class EditPlayer extends Component {
    constructor() {
        super();
        this.state = {
            playerInfo: [],
            name: 'Taco',
            email: '',
            school: '',
            classYear: '',
            position: '',
            picUrl: '',
            phoneNumber: '',
        }
    }

    getPlayer = () => {
        const playerId = this.props.match.params.player_id;
        Axios.get(`/api/single/${playerId}`)
            .then(res => {
                //console.log(res.data);
                //this.props.getUser(res.data[0]);
                this.setState({ playerInfo: res.data[0] })
            })
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount() {
        const {name,email,position,school,class_year,phone_number,profile_pic} = this.props.playerReducer.player;
        this.getPlayer();
        this.setState({ name, email, position,school,classYear: class_year,position,phoneNumber: phone_number,picUrl: profile_pic })
    }

    cancelButton = () => {
        this.props.history.push('/profile');
    }

    deleteButton = () => {
        const player_id = this.state.playerInfo.player_id;
        const recruiter_id = 1000
        Axios.delete(`/api/deleteaccount/${player_id}/${recruiter_id}`)
        this.props.history.push('/')
    }

    editPlayer = () => {
        const { name, email, school, classYear, position, picUrl, phoneNumber } = this.state;
        const player_id = this.state.playerInfo.player_id;
        if (!name || !email || !school || !classYear || !position || !picUrl || !phoneNumber) {
            alert('please fill in all fields');
        } else {
            Axios.put(`/api/editinfo/${player_id}`, { name, email, school, classYear, position, picUrl, phoneNumber })
                .then(res => {
                    console.log(res.data);
                    this.props.getUser(res.data);
                    this.props.history.push('/profile');
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        //console.log(this.state);
        console.log(this.props);
        return (
            <div className='edit-player-app'>
                <div className='profile-container'>
                    <img src={`${this.props.playerReducer.player.profile_pic}`}
                        className='profile-pic' alt='player' />
                    <h3>{this.props.playerReducer.player.name}</h3>
                    <p>School: {this.props.playerReducer.player.school}</p>
                    <p>Class: {this.props.playerReducer.player.class_year}</p>
                    <p>Position: {this.props.playerReducer.player.position}</p>
                    <p>Email: {this.props.playerReducer.player.email}</p>
                    <p>Phone: {this.props.playerReducer.player.phone_number}</p>
                </div>
                <div className='register-inputs'>
                    <p className='recruit-warning'>Fill Out All Fields</p>
                    <input placeholder='Name *' name='name' onChange={this.handleInput} value={this.state.name} />
                    <input placeholder='Email *' name='email' onChange={this.handleInput} value={this.state.email}/>
                    <input placeholder='School *' name='school' onChange={this.handleInput} value={this.state.school}/>
                    <input placeholder='Class Year' name='classYear' onChange={this.handleInput} value={this.state.classYear}/>
                    <input placeholder='Position' name='position' onChange={this.handleInput} value={this.state.position}/>
                    <input placeholder='Profile Pic Url' name='picUrl' onChange={this.handleInput} value={this.state.picUrl}/>
                    <input placeholder='Phone Number *' type="tel" name='phoneNumber' onChange={this.handleInput} value={this.state.phoneNumber}/>
                    <div>
                        <button onClick={this.editPlayer}>Save Changes</button>
                        <button onClick={this.deleteButton}>Delete Account</button>
                        <button onClick={this.cancelButton}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps, { getUser })(EditPlayer);