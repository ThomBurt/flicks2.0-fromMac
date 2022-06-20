import React from 'react';

import './About.css';

import flickVid from '../../components/Assets/Videos/flicks2.mp4'
import threePhonesVideo from '../../components/Assets/Videos/aboutIphones.mp4';


import { RiMovieFill } from 'react-icons/ri';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaCocktail } from 'react-icons/fa';


const About = () => {

    const speed = 10

    return(
        <div className='main-about-div'>
            <div className='title-div'>
                <h1 className='about-title'>About Us</h1>
            </div>
            <div className='threeVideoDiv'>
                <video  loop autoPlay muted playbackRate={speed}>
                    <source src={flickVid} type="video/mp4" />
                </video>
                <div className='about-text'>
                    <h2>What is Flicks + Food?</h2>
                    <p>
                        Have you ever sat at home wondering how to arrange a great night in? <br />  <br /> 
                        Whether with your partner or friends, agreeing on a Movie and Dinner is always tough.<br /> <br /> 
                        We take the stress out of your hands by offering a random movie choice within a genre of your selection.<br /> <br /> 
                        A list of viable restaurants in your area that offer delivery or takeout options, and to top it off! <br /> <br /> 
                        We even give you a random drink option. <br /> <br /> 
                        Perfection!
                    </p>
                </div>
            </div>
            <div className='threeVideoDiv'>
            <div className='about-text'>

                    <span className='about-icon-3section'><RiMovieFill /></span>
                    <h2>First, select a Movie <span><RiMovieFill /></span></h2>
                    <p>
                        Start out by choosing a genre, and a date-range to be given a random movie to watch, along with streaming services in which that movie is available on.
                    </p>

                    <span className='about-icon-3section'><MdOutlineRestaurantMenu /></span>
                    <h2 className='h2-restaurant-about'>Next, pick a Restaurant <span><MdOutlineRestaurantMenu /></span></h2>
                    <p>
                        Next, choose your location and a cuisine, and you will be given a list of local restaurants that are in your area for dinner!
                    </p>

                    <span className='about-icon-3section'><FaCocktail /></span>
                    <h2>Then, top it off with a drink! <span><FaCocktail /></span></h2>
                    <p>
                        We will give you a random drink option, that will pair perfectly with your evening.
                    </p>
                </div>
                <video  loop autoPlay muted >
                    <source src={threePhonesVideo} type="video/mp4" />
                </video>
            </div>
            <div className='get-started-about'>
                <h1>Join the fun</h1>
                <button onClick={event =>  window.location.href='/welcome'}>Get Started</button>
            </div>
        </div>
    )
}

export default About;