import React, { Component } from 'react';
import './SinglePlayerDisplay.css';

class SinglePlayerDisplay extends Component {

    render() {
        return (
            <div className='single-player-frame'>
                <div>
                    <img src={this.props.picture} />
                    <h4>{this.props.name}</h4>
                </div>
                <div>
                    <div className='upper'>
                        <h4>Aces:{Math.round(this.props.aces * 100) / 100}</h4>
                        <h4>Digs:{Math.round(this.props.digs * 100) / 100}</h4>
                        <h4>Blocks:{Math.round(this.props.blocks * 100) / 100}</h4>
                    </div>
                    <div className='lower'>
                        <h4>Total Kills:{Math.round(this.props.kills * 100) / 100}</h4>
                        <h4>Kill%{Math.round((this.props.kills / this.props.hitAttempts) * 100) / 100}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default SinglePlayerDisplay;