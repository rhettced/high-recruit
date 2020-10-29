
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class LiveStats extends Component{
    constructor(){
        super();
        this.state = {
            player_id: '',
            playerIndex: null,
            player_index2:null,
            players: [],
            onCourt: [],
            onBench: []
        }
    }

    //highlight function on css to see what you are clicked on
    getAllPlayers = () =>{
        Axios.get(`/api/displayplayers`)
        .then(res => {
            console.log(res.data)
            this.setState({players: res.data});
            this.setState({onCourt: res.data.splice(0,6)})
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.getAllPlayers();
    }

    getPlayersIdBench= (id,index) =>{
        this.setState({player_id: id, playerIndex: index})
    }
    getPlayersIdCourt= (id,index) =>{
        this.setState({player_id: id, playerIndex2: index})
    }

    render(){
        //console.log(this.state.onCourt);
        const mappedPlayer=this.state.players.map((el,ind) =>{
            return <div key={ind} onClick={()=>this.getPlayersIdBench(el.player_id,ind)}>{el.name}</div>
        });

        const courtPlayers=this.state.onCourt.map((el,ind) =>{
            return <div key={ind} onClick={()=>this.getPlayersIdCourt(el.player_id,ind)}>{el.name}</div>
        });

        //console.log(this.state.player_id);
        console.log(this.state.playerIndex);
        console.log(this.state.playerIndex2);
        return(
            <div>
                <h2>Bench</h2>
                {mappedPlayer}
                <h2>Court</h2>
                {courtPlayers}
            </div>
            
        );
    }

}
const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(LiveStats);