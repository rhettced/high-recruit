import Axios from 'axios';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import './PlayerView.css';

class PlayerView extends Component{
    constructor(){
        super();
        this.state ={
            addGameToggle: 0,
            aces: null,
            digs: null,
            blocks: null,
            hitAttempts: null,
            kills: null,
            games:[]
        }
    }

    addGameDisplay = () => {
        this.setState({addGameToggle: 1})
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    addGame = () => {
        const {aces,digs,blocks,hitAttempts,kills} = this.state;
        const playerId = this.props.playerReducer.player.player_id;
        Axios.post('/api/addgame',{aces,digs,blocks,hitAttempts,kills,playerId})
        .then(res =>{
            //console.log(res.data);
            this.setState({games: res.data, 
                           aces: null, 
                           digs: null, 
                           blocks: null, 
                           hitAttempts: null, 
                           kills: null,
                           addGameToggle: 0});
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log(this.state.games);
        return(
            <div className='playerview-app'>
                <div className='playerview-total'>
                    <div className='profile-container'>
                        <img src={`${this.props.playerReducer.player.profile_pic}`} 
                        className='profile-pic'/>
                        <h3>{this.props.playerReducer.player.name}</h3>
                        <p>School: {this.props.playerReducer.player.school}</p>
                        <p>Class: {this.props.playerReducer.player.class_year}</p>
                        <p>Position: {this.props.playerReducer.player.position}</p>
                        <p>Email: {this.props.playerReducer.player.email}</p>
                        <p>Phone: {this.props.playerReducer.player.phone_number}</p> 
                    </div>
                    {this.state.addGameToggle === 0? <button className='toggle-button' onClick={this.addGameDisplay}> Add Game </button>:
                    <div className='add-game-container'>
                        <input type="number" placeholder='Aces' name='aces' onChange={this.handleInput}/>
                        <input type="number" placeholder='Digs' name='digs' onChange={this.handleInput}/>
                        <input type="number" placeholder='Blocks' name='blocks' onChange={this.handleInput}/>
                        <input type="number" placeholder='Hit Attempts' name='hitAttempts' onChange={this.handleInput}/>
                        <input type="number" placeholder='Kills' name='kills' onChange={this.handleInput}/>
                        <button onClick={this.addGame}> Add Game </button>
                    </div>}
                    
                </div>
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(PlayerView);