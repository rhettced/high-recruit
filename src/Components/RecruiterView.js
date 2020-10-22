import React, {Component} from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import SinglePlayerDisplay from './SinglePlayerDisplay';
import './RecruiterView.css';

class RecruiterView extends Component{
    constructor(){
        super();
        this.state = {
            players: []
        }
    }

    getAllPlayers = () =>{
        Axios.get(`/api/displayplayers`)
        .then(res => {
            //console.log(res.data[0])
            this.setState({players: res.data});
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.getAllPlayers();
    }

    render(){
        console.log(this.state.players);
        const mappedPlayers = this.state.players.map((player,ind) => {
            return <SinglePlayerDisplay key={ind}
                                        name={player.name}
                                        aces={player.avg_aces}
                                        digs={player.avg_digs}
                                        blocks={player.avg_blocks}
                                        picture={player.profile_pic}
                                        kills={player.total_kills}
                                        hitAttempts={player.total_hit_attempts}
                                        player_id={player.player_id}/>
        });
        return(
            <div className='recruiter-app'>
                <div className='players-display'>
                    {mappedPlayers}
                </div>
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(RecruiterView);