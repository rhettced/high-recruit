
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class LiveStats extends Component{
    constructor(){
        super();
        this.state = {
            player_id: '',
            players: [],
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

    getPlayersId= (id) =>{
        this.setState({player_id: id})
    }

    render(){
        const mappedPlayer=this.state.players.map((el,ind) =>{
            return <div key={ind} onClick={()=>this.getPlayersId(el.player_id)}>{el.name}</div>
        });
        console.log(this.state.player_id);
        return(
            <div>
                <p onClick={this.getPlayersId}>{this.props.playerReducer.player.name}</p>
                {mappedPlayer}
            </div>
            
        );
    }

}
const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(LiveStats);