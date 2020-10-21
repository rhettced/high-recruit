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
            opponent:'',
            games:[],
            playerStats: []
        }
    }

    
    addGameDisplay = () => {
        this.setState({addGameToggle: 1})
    }
    
    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    getGames = () =>{
        Axios.get(`/api/getplayersgames`)
        .then(res => {
            this.setState({games: res.data})
        })
        .catch(err => console.log(err))
    }
    
    addGame = () => {
        const {aces,digs,blocks,hitAttempts,kills,opponent} = this.state;
        const playerId = this.props.playerReducer.player.player_id;
        if(aces === null || digs === null || hitAttempts === null || kills === null){
            return console.log('Please fill empty spaces')
        } else {
            Axios.post('/api/addgame',{aces,digs,blocks,hitAttempts,kills,playerId,opponent})
            .then(res =>{
                //console.log(res.data);
                this.setState({games: res.data, 
                    aces: null, 
                    digs: null, 
                    blocks: null, 
                    hitAttempts: null, 
                    kills: null,
                    opponent:'',
                    addGameToggle: 0});
                })
                .catch(err => console.log(err))
            }
        }
        
        getStats = () => {
            Axios.get(`/api/playerstats`)
            .then(res => {
                this.setState({playerStats: res.data[0]})
            })
            .catch(err => console.log(err))
        }
        
        componentDidMount(){
            this.getGames();
            this.getStats();
            //console.log(this.props.playerReducer)
        }

        render(){
        //console.log(this.state.games);
        //console.log(this.state.playerStats);
        const mappedGames = this.state.games.map((el,ind) => {
            return <div key={ind}>
                <p>Opponent:{el.opponent}</p>
                <p>Aces:{el.aces}</p>
                <p>Digs:{el.digs}</p>
                <p>Blocks:{el.blocks}</p>
                <p>Kills:{el.kills}</p>
                <p>Attempts:{el.hit_attempts}</p>
            </div>
        })
        //console.log(this.state.games);
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
                        <input type="text" placeholder='Opponent' name='opponent' onChange={this.handleInput}/>
                        <button onClick={this.addGame}> Add Game </button>
                    </div>}
                    <div className='stat-box'>
                        <div>Avg Stats per Game</div>
                        <div className='top-line'>
                            <p>Aces: {Math.round(this.state.playerStats.avg_aces*100)/100}</p>
                            <p>Digs: {Math.round(this.state.playerStats.avg_digs*100)/100}</p>
                            <p>Blocks: {Math.round(this.state.playerStats.avg_blocks*100)/100}</p>
                        </div>
                        <div className='bottom-line'>
                             <p>Kills: {Math.round(this.state.playerStats.avg_kills*100)/100}</p>
                             <p>Kill%: {Math.round((this.state.playerStats.total_kills/this.state.playerStats.total_hit_attempts)*100)/100}</p>
                        </div>
                    </div>
                    {mappedGames}
                </div>
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(PlayerView);