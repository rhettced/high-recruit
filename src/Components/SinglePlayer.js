import Axios from 'axios';
import React, {Component} from 'react';

class SinglePlayer extends Component{
    constructor(){
        super();
        this.state ={
            player: []
        }
    }

    getPlayer = () => {
        const playerId = this.props.match.params.player_id;
        Axios.get(`/api/single/${playerId}`)
        .then(res =>{
            //console.log(res.data);
            this.setState({player: res.data[0]})
        })
    }

    componentDidMount(){
        this.getPlayer();
    }

    render(){
        console.log(this.state.player)
        return(
            <div>
                <div className='single-player-container'>
                        <img src={`${this.state.player.profile_pic}`} 
                        className='profile-pic' alt='player'/>
                        <h3>{this.state.player.name}</h3>
                        <p>School: {this.state.player.school}</p>
                        <p>Class: {this.state.player.class_year}</p>
                        <p>Position: {this.state.player.position}</p>
                        <p>Email: {this.state.player.email}</p>
                        <p>Phone: {this.state.player.phone_number}</p> 
                    </div>
            </div>
        );
    }
}

export default SinglePlayer;