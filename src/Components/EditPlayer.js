import React, {Component} from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';


import './RecruiterView.scss';

class EditPlayer extends Component{
    constructor() {
        super();
        this.state = {
            playerInfo:[],
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

    getPlayer = () => {
        const playerId = this.props.match.params.player_id;
        Axios.get(`/api/single/${playerId}`)
        .then(res =>{
            //console.log(res.data);
            this.setState({playerInfo: res.data[0]})
        })
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount(){
        this.getPlayer();
        this.setState({name: this.state.playerInfo.name})
    }

    cancelButton = () =>{
        this.props.history.push('/profile');
    }

    deleteButton = () =>{
        const player_id = this.state.playerInfo.player_id;
        const recruiter_id = 1000;
        Axios.delete(`/api/deleteaccount/${player_id}/${recruiter_id}`)
        this.props.history.push('/')
    }

    render(){
        console.log(this.state.playerInfo.player_id);
        return(
            <div className='edit-player-app'>
                <div className='register-inputs'>
                            <p className='recruit-warning'>Recruiter fill out * only</p>
                            <input placeholder='Name *' name='name' onChange={this.handleInput} value={this.state.name}/>
                            <input placeholder='Email *' name='email' onChange={this.handleInput} />
                            <input placeholder='Password *' type='password' name='password' onChange={this.handleInput} />
                            <input placeholder='School *' name='school' onChange={this.handleInput} />
                            <input placeholder='Class Year' name='classYear' onChange={this.handleInput} />
                            <input placeholder='Position' name='position' onChange={this.handleInput} />
                            <input placeholder='Profile Pic Url' name='picUrl' onChange={this.handleInput} />
                            <input placeholder='Phone Number *' type="tel" name='phoneNumber' onChange={this.handleInput} />
                            <div>
                                <button>Save Changes</button>
                                <button onClick={this.deleteButton}>Delete Account</button>
                                <button onClick={this.cancelButton}>Cancel</button>
                            </div>
                        </div>
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(EditPlayer);