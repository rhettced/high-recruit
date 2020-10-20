import React, {Component} from 'react';
import './Header.css';

class Header extends Component{
    render(){
        return(
            <header className='header-app'>
                <div className='HR-header'>
                    <img src='https://st2.depositphotos.com/5943796/11381/v/950/depositphotos_113815596-stock-illustration-initial-letter-hr-red-swoosh.jpg'
                    className='header-logo'/>
                    <h1>HighRecruits</h1>
                    <button> Logout </button>
                </div>
            </header>
        );
    }
}

export default Header;