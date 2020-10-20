import React, {Component} from 'react';
import { connect } from 'react-redux';

class RecruiterView extends Component{
    render(){
        return(
            <div>
                <div>RecruiterView</div>
            </div>
        );
    }
}

const mapMyStateToProps = reduxState => reduxState;

export default connect(mapMyStateToProps)(RecruiterView);