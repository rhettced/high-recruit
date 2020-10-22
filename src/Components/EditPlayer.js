import React, {Component} from 'react';
import { connect } from 'react-redux';


import './RecruiterView.scss';

class RecruiterView extends Component{
    constructor(){
        super();
        this.state = {
            players: []
        }
    }

    render(){
 
        return(
            <div>
                Edit Player
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(RecruiterView);