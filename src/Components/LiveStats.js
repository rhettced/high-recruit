
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import './LiveStats.scss';

class LiveStats extends Component{
    constructor(){
        super();
        this.state = {
            player_id: '',
            playerIndex: null,
            player_index2:null,
            players: [],
            onCourt: [],
            onBench: [],
            ace: 0,
            dig: 0,
            block: 0,
            hitAttempt: 0,
            kill: 0,
            currentGameStats: [],
            opponent: ''
        }
    }

    //highlight function on css to see what you are clicked on
    getAllPlayers = () =>{
        Axios.get(`/api/displayplayers`)
        .then(res => {
            //console.log(res.data)
            this.setState({players: res.data});
            this.setState({onCourt: res.data.slice(0,6)});
            this.setState({onBench: res.data.slice(6)})
        })
        .catch(err => console.log(err))
    }

    getPlayersIdBench= (id,index) =>{
        this.setState({player_id: id, playerIndex: index})
    }
    getPlayersIdCourt= (id,index) =>{
        this.setState({player_id: id, playerIndex2: index})
    }
    increaseStat = (action) => {
        this.setState({ [action]: 1 })
        console.log('ace',this.state.ace);
        console.log('dig' ,this.state.dig);
    }
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    subPlayer = () =>{
        const playerToSub = this.state.onCourt.splice(this.state.playerIndex2,1,this.state.onBench[this.state.playerIndex]);
        //console.log(playerToSub);
        this.state.onBench.splice(this.state.playerIndex,1,playerToSub[0]);
        //this.state.onBench.push(playerToSub[0])
        //console.log(this.state.onBench)
        this.setState({onCourt: this.state.onCourt, onBench: this.state.onBench});
        //console.log(this.state.onBench)
    }

    sendPlay = () =>{
        const {ace,dig,block,hitAttempt,kill,player_id} = this.state;
        Axios.post('/api/addsingleplay',{ace,dig,block,hitAttempt,kill,player_id})
        .then((res)=>{
            
            this.setState({ace: 0, dig: 0, block: 0, hitAttempt: 0, kill: 0, currentGameStats: res.data})
            //console.log(this.state.currentGameStats);
        })
        .catch(err => console.log(err))
    }
    sendGame = ()=>{
        const {opponent} = this.state;
        for(let i =0; i<this.state.currentGameStats.length; i++){
            console.log(this.state.currentGameStats[i]);
            Axios.post('/api/turnstatstogame',{...this.state.currentGameStats[i],opponent})
            .then(() =>{
                
            })
            .catch(err => console.log(err))
        }
        alert('good game stats cleared')
    }
    
    componentDidMount(){
        this.getAllPlayers();
    }

    render(){
        const benchPlayers=this.state.onBench.map((el,ind) =>{
            return <div key={ind} 
                        onClick={()=>this.getPlayersIdBench(el.player_id,ind)}>{el.name}</div>
        });

        const courtPlayers=this.state.onCourt.map((el,ind) =>{
            return <div key={ind} 
                        onClick={()=>this.getPlayersIdCourt(el.player_id,ind)}
                        className={this.state.player_id===el.player_id?'on-court-list': 'on-court-list-selected'}>{el.name}</div>
        });

        const gameStats=this.state.currentGameStats.map((el,ind)=>{
            return <div key={ind} className='box-stats'>
                <div>{el.name}</div>
                <div>Aces: {el.aces}</div>
                <div>Digs: {el.digs}</div>
                <div>Blocks: {el.blocks}</div>
                <div>Hit Attempts: {el.hit_attempts}</div>
                <div>Kills: {el.kills}</div>
            </div>
        })
        //console.log(this.state.onCourt);

        //console.log(this.state.player_id);
        //console.log(this.state.playerIndex);
        //console.log('index 2', this.state.playerIndex2);
        return(
            <div>
                <h2>Bench</h2>
                {benchPlayers}
                <button onClick={this.subPlayer}>Sub</button>
                <h2>Court</h2>
                {courtPlayers}
                <div className='stat-checker'>
                    <h3 name='ace' onClick={()=>this.increaseStat('ace')} className={this.state.ace===0? 'action':'action-selected'}>Ace</h3>
                    <h3 name='dig' onClick={()=>this.increaseStat('dig')} className={this.state.dig===0? 'action':'action-selected'}>Dig</h3>
                    <h3 name='block' onClick={()=>this.increaseStat('block')} className={this.state.block===0? 'action':'action-selected'}>Block</h3>
                    <h3 name='hitAttempt' onClick={()=>this.increaseStat('hitAttempt')} className={this.state.hitAttempt===0? 'action':'action-selected'}>Hit-Attempt</h3>
                    <h3 name='kill' onClick={()=>this.increaseStat('kill')} className={this.state.kill===0? 'action':'action-selected'}>Kill</h3>
                </div>
                <button onClick={this.sendPlay}>Add Stat</button>
                <p>Player  Aces  Digs Blocks Hit Attempts Kills</p>
                {gameStats}
                <input placeholder='Opponent' name='opponent' onChange={this.handleInput}/>
                <button onClick={this.sendGame}>Add game to Players Stats</button>
            </div>
            
        );
    }

}
const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(LiveStats);