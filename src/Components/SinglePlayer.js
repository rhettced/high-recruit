import Axios from 'axios';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import './SinglePlayer.scss';

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

    sendContact = () => {
        const player_email = this.state.player.email;
        const player_name = this.state.player.name;
        const rec_name = this.props.recruiterReducer.recruiter.name
        const phone_number = this.props.recruiterReducer.recruiter.phone_number;
        const rec_email = this.props.recruiterReducer.recruiter.email;
        const {school} = this.props.recruiterReducer.recruiter;
        
        Axios.post(`/api/email`,{player_email,player_name,rec_name,phone_number,rec_email,school})
        .then((res)=>{
            res.status(200).send(alert('email has sent'));
        })
        alert(`email has sent`)
        this.props.history.push('/recruitview')
    }

    textContact = () =>{
        const player_name = this.state.player.name;
        const rec_name = this.props.recruiterReducer.recruiter.name
        const phone_number = this.props.recruiterReducer.recruiter.phone_number;
        const rec_email = this.props.recruiterReducer.recruiter.email;
        const {school} = this.props.recruiterReducer.recruiter;
        const player_phone = this.state.player.phone_number;
        
        Axios.post(`/api/text`,{player_phone,player_name,rec_name,phone_number,rec_email,school})
        .then((res)=>{
            res.status(200).send(alert('email has sent'));
        })
        alert(`text has sent`)
        this.props.history.push('/recruitview')
    }

    componentDidMount(){
        // if(!this.props.recruiterReducer.recruiter.name){
        //     this.props.history.push('/');
        // } else{
        // }
        this.getPlayer();
    }

    render(){
        console.log(this.state.player)
        return(
            <div className='single-player-app-container'>
                <div className='single-player-container'>
                        <img src={`${this.state.player.profile_pic}`} 
                        className='single-profile-pic' alt='player'/>
                        <h3>{this.state.player.name}</h3>
                        <p>School: {this.state.player.school}</p>
                        <p>Class: {this.state.player.class_year}</p>
                        <p>Position: {this.state.player.position}</p>
                        <p>Email: {this.state.player.email}</p>
                        <p>Phone: {this.state.player.phone_number}</p>
                        <button onClick={this.sendContact}>Email Contact Info</button> 
                        <button onClick={this.textContact}>Text Contact Info</button> 
                    </div>
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(SinglePlayer);