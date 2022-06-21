import React from 'react';

import ICON from '../../Assets/img/icon-WHITE.png'

import './bg.css';


export function BG() {
    return(
        <div className='bg-img'>
            <div className='main-div'>
                <div>
                    <div className='icon-div'>
                        <img src={ICON} className='logo' alt="food and flicks logo"></img>
                    </div>
                    <div className='header'>
                        <h4>Let's make your perfect night in!</h4>
                    </div>
                    <div className='button-div'>
                        <button className='button-getStarted' onClick={event =>  window.location.href='/welcome'} >Get Started!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}