import React, { Component } from 'react';
import './SinglePlayerDisplay.scss';
import {Link} from 'react-router-dom';

class SinglePlayerDisplay extends Component {

    render() {
        return (
            <Link to={`/player/${this.props.player_id}`} className='Link'>
            <div className='single-player-frame'>
                <div>
                    <img src={this.props.picture} alt='player'/>
                </div>
                <div>
                    <h4>{this.props.name}</h4>
                    <div className='upper'>
                        <p>Aces:{Math.round(this.props.aces * 100) / 100}</p>
                        <p>Digs:{Math.round(this.props.digs * 100) / 100}</p>
                        <p>Blocks:{Math.round(this.props.blocks * 100) / 100}</p>
                    </div>
                    <div className='lower'>
                        <p>Total Kills:{Math.round(this.props.kills * 100) / 100}</p>
                        <p>Kill%{Math.round((this.props.kills / this.props.hitAttempts) * 100) / 100}</p>
                    </div>
                </div>
            </div>
            </Link>
        );
    }
}

export default SinglePlayerDisplay;