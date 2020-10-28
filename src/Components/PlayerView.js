import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayerView.scss';
import {Link} from 'react-router-dom';
import {getStatsRedux} from '../Redux/player_reducer';

class PlayerView extends Component {
    constructor() {
        super();
        this.state = {
            addGameToggle: 0,
            aces: null,
            digs: null,
            blocks: null,
            hitAttempts: null,
            kills: null,
            opponent: '',
            games: [],
            playerStats: [],
            numProfileViews: 0
        }
    }


    addGameDisplay = () => {
        this.setState({ addGameToggle: 1 })
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    getGames = () => {
        Axios.get(`/api/getplayersgames`)
            .then(res => {
                this.setState({ games: res.data })
            })
            .catch(err => console.log(err))
    }

    addGame = () => {
        const { aces, digs, blocks, hitAttempts, kills, opponent } = this.state;
        const playerId = this.props.playerReducer.player.player_id;
        if (aces === null || digs === null || hitAttempts === null || kills === null) {
            return alert('Please fill empty spaces')
        } else {
            Axios.post('/api/addgame', { aces, digs, blocks, hitAttempts, kills, playerId, opponent })
                .then(res => {
                    //console.log(res.data);
                    this.setState({
                        games: res.data,
                        aces: null,
                        digs: null,
                        blocks: null,
                        hitAttempts: null,
                        kills: null,
                        opponent: '',
                        addGameToggle: 0
                    });
                })
                .catch(err => console.log(err))
        }
    }

    getStats = () => {
        Axios.get(`/api/playerstats`)
            .then(res => {
                this.setState({ playerStats: res.data[0] })
                this.props.getStatsRedux(res.data[0]);
            })
            .catch(err => console.log(err))
    }

    profileViews = () =>{
        const {player_id} = this.props.playerReducer.player;
        Axios.get(`/api/numprofileviews/${player_id}`)
        .then(res =>{
            //console.log(res.data);
            this.setState({numProfileViews: res.data[0].count});
        })
    }

    componentDidMount() {
        //console.log(this.state.numProfileViews);
        // if(!this.props.playerReducer.player.name){
            //     this.props.history.push('/');
            // }
            this.getGames();
            this.getStats();
            this.profileViews();
            //console.log(this.props.playerReducer)
        }
        // componentDidUpdate(prevProps, prevState){
            //     if(prevState.numProfileViews !== this.state.numProfileViews){
                //         this.profileViews();
                //     }
                // }
                
        render() {
        console.log(this.state.playerStats);
        //console.log(this.state.games);
       // console.log(this.state.numProfileViews);
        const mappedGames = this.state.games.map((el, ind) => {
            return <div key={ind} className='single-game'>
                <p>Opponent:{el.opponent}</p>
                <p>Aces:{el.aces}</p>
                <p>Digs:{el.digs}</p>
                <p>Blocks:{el.blocks}</p>
                <p>Kills:{el.kills}</p>
                <p>Attempts:{el.hit_attempts}</p>
            </div>
        })
        //console.log(this.state.games);
        return (
            <div className='playerview-app'>
                <div className='playerview-total'>
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
                    <p className='num-views'>Your profile has {this.state.numProfileViews} recruiter views</p>
                    <Link to={`/statchart/${this.props.playerReducer.player.player_id}`}>View your stats vs average stats</Link>
                    {this.state.addGameToggle === 0 ? <button className='toggle-button' onClick={this.addGameDisplay}> Add Game </button> :
                        <div className='add-game-container'>
                            <input type="number" placeholder='Aces' name='aces' onChange={this.handleInput} />
                            <input type="number" placeholder='Digs' name='digs' onChange={this.handleInput} />
                            <input type="number" placeholder='Blocks' name='blocks' onChange={this.handleInput} />
                            <input type="number" placeholder='Hit Attempts' name='hitAttempts' onChange={this.handleInput} />
                            <input type="number" placeholder='Kills' name='kills' onChange={this.handleInput} />
                            <input type="text" placeholder='Opponent' name='opponent' onChange={this.handleInput} />
                            <button onClick={this.addGame}> Add Game </button>
                        </div>}
                    <div className='stat-box'>
                        <div className='stat-title'>Avg Stats per Game</div>
                        <div className='stat-numbers'>
                            <div className='top-line'>
                                <p>Aces: {Math.round(this.state.playerStats.avg_aces * 100) / 100}</p>
                                <p>Digs: {Math.round(this.state.playerStats.avg_digs * 100) / 100}</p>
                                <p>Blocks: {Math.round(this.state.playerStats.avg_blocks * 100) / 100}</p>
                            </div>
                            <div className='bottom-line'>
                                <p>Kills: {Math.round(this.state.playerStats.avg_kills * 100) / 100}</p>
                                <p>Kill%: {Math.round((this.state.playerStats.total_kills / this.state.playerStats.total_hit_attempts) * 100) / 100}</p>
                            </div>
                        </div>
                    </div>
                    <div className='games-list'>
                        {mappedGames}
                    </div>
                </div>
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps,{getStatsRedux})(PlayerView);