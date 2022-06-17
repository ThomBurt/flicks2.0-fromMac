import React, { useState } from 'react';

import { FaHandPointUp } from 'react-icons/fa';

import './HistoryExperience.css';

import {HistoryDrinkModal} from './HistoryDrinkModal';


const HistoryDB = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    // let searchResults = null;
    let experience = props.experience
    console.log(experience)

    const movie = experience.movie;
    const restaurant = experience.restaurant;
    const drink = experience.drink;
    const createdAt = experience.createdAt;
    
    // let drinkSearchResults = drink?.map(d => <HistoryDrinkModal key={d._id} drink={d}
    //     open={isOpen} visible={props} onClose={()=> setIsOpen(false)}   />);
    
    // console.log(movie[0].title)
  
    return(
        <div className='experience'>
            <div className='createdAtHeading'>
                <h3>{createdAt.slice(0, 15)}</h3>
            </div>
            <div className='selection-container'> 
                 <div className='selection-div'>
                      <div>
                        <h4>
                            {/* {movie[0].title} */}
                        </h4>
                      </div>
                      <div>
                          <img className="moviePosterHistory" src={movie[0].image_url} alt="movieposter"></img>
                      </div>
                      <button className='click-button-for-modal'><FaHandPointUp /></button>
                 </div>
  
                <div className='selection-div'>
                      <h4>
                           {restaurant[0].name}
                      </h4>
                      <div>
                          <img className='restaurantHistoryImage' src={restaurant[0].image_url} alt="restaurantpic"></img>
                      </div>
                      <button className='click-button-for-modal'><FaHandPointUp /></button>
                </div>
  
                <div className='selection-div'>
                    <div>
                        <h4>
                          {drink[0].name}
                        </h4>
                        <div>
                          <img className='drinkHistoryImage' src={drink[0].image_url} alt="drinkpic"></img>
                      </div>
                    </div>
                    <button onClick={() => setIsOpen(true)} className='click-button-for-modal'><FaHandPointUp /></button>
                    <HistoryDrinkModal open={isOpen} visible={props} onClose={()=> setIsOpen(false)} />
                    {/* {drinkSearchResults} */}
                </div>
            </div>
        </div>
  
    )
}

export default HistoryDB;


