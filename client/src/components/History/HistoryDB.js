import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FaHandPointUp } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

import './HistoryExperience.css';

//  import {HistoryDrinkModal} from './HistoryDrinkModal';

import { REMOVE_EXPERIENCE } from '../../utils/mutations';

import { GET_ME } from '../../utils/queries';



const HistoryDB = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const {data} = useQuery(GET_ME);
    const [removeExperience] = useMutation(REMOVE_EXPERIENCE);

    console.log(data)
    
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

    const handleDeleteExperience = async () => {


        try {
            await removeExperience({
                variables: {
                    id: data.me._id,
                    experienceId: experience._id
                }
            })
        } catch (e) {
            console.error(e);
          }
          window.location.reload();
    }





  
    return(
        <div className='experience'>
            <div className='createdAtHeading'>
                <h3>{createdAt.slice(0, 15)}</h3>
                <button onClick={handleDeleteExperience}> <AiFillDelete /></button>
            </div>
            <div className='selection-container'> 
                 <div className='selection-div'>
                      <div>
                        <h4>
                            {movie[0].title}
                        </h4>
                      </div>
                      <div>
                          <img className="moviePosterHistory" src={movie[0].image_url} alt ="movieposter"></img>
                      </div>
                      {/* <button className='click-button-for-modal'><FaHandPointUp /></button> */}
                 </div>
  
                <div className='selection-div'>
                      <h4>
                           {restaurant[0].name}
                      </h4>
                      <div>
                          <img className='restaurantHistoryImage' src={restaurant[0].image_url} alt="restaurantpic"></img>
                      </div>
                      {/* <button className='click-button-for-modal'><FaHandPointUp /></button> */}
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
                    {/* <button onClick={() => setIsOpen(true)} className='click-button-for-modal'><FaHandPointUp /></button>
                    <HistoryDrinkModal open={isOpen} visible={props} onClose={()=> setIsOpen(false)} /> */}
                    {/* {drinkSearchResults} */}
 
                </div>

            </div>

        </div>
  
    )
}

export default HistoryDB;


