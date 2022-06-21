import './Modal.css';

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaHandPointUp } from 'react-icons/fa';


import { GET_ME } from '../../../../../utils/queries';
import { SAVE_RESTAURANT } from '../../../../../utils/mutations';

import { USER_TO_GET_EXPERIENCE_ID } from "../../../../../utils/queries";

import { useQuery, useMutation } from '@apollo/client';

//import axios from 'axios';

export function Modal({ open, children, onClose, props }) {

    const {data} = useQuery(GET_ME);
  
    useEffect(()=> {
      if (data) {
        //  console.log(data)
          setRestaurantExperienceData({
            myExperiences: data.me.experiences 
          })
      }
  }, [data]);


  const [experienceChoice, setExperienceChoice] = useState("");
  const [restaurantExperienceData, setRestaurantExperienceData] = useState([])
  const [isHovering, setIsHovering] = useState(false);

    // Save Movie Mutation 
    const [saveRestaurant] = useMutation(SAVE_RESTAURANT, {
      update(cache, { data: { saveRestaurant } }) {
        try {
                  // update thought array's cache
          // could potentially not exist yet, so wrap in a try/catch
          const { restaurant } = cache.readQuery({ query: USER_TO_GET_EXPERIENCE_ID  });
          // prepend the newest thought to the front of the array
          cache.writeQuery({
            query: USER_TO_GET_EXPERIENCE_ID ,
            data: { restaurants: [saveRestaurant, ...restaurant] },
          });
        } catch (e) {
          console.error(e);
        }
    }
  })


  if (!open) return null;


  const { name, location, rating, phone, url, image_url } = props;

  const address = `${location.address1}, ${location.city} ${location.state} ${location.zip_code}`;
  const placeholderImg = image_url
    ? image_url
    : 'https://via.placeholder.com/250';


  
  //       ${encodeURIComponent(address)}&key=AIzaSyAT-nlITvzakKRo0xMvxiovQyh2j6Lh6vg`)

  //       const data = response.data;
  //       //console.log(data);
  //       if(!data || data.status === 'ZERO_RESULTS') {
  //         console.log('could not find location for this address')
  //       }

  //       const coordinates = data.results[0].geometry.location;

  //       //return coordinates;
  //       console.log(coordinates);
  //   }

    
  // getCoordsFromAddress(address);

  const uriAddress = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
  &q=${encodeURIComponent(address)}`

  const onExperienceDecision = (event) => {
    const experienceIdChoice = event.target.value;
    setExperienceChoice(experienceIdChoice);
      console.log(experienceChoice)
  }

    //Save movie to Experience
    const saveRestaurantToExperience = async () => {
      // event.preventDefault();
      
        try {
          await saveRestaurant({
            variables: { 
              id: experienceChoice,
              name: name,
              url: url,
              imageUrl: image_url,
            }
          })
          console.log('movie added')
        } catch (e) {
          console.error(e);
        }
    }
    
    const chooseRestaurantButtonClick = (e) => {
      e.preventDefault();
      saveRestaurantToExperience();
      window.location.href='/drink'
    }


    const handleMouseOver = () => {
      setIsHovering(true);
    };
    
    const handleMouseOut = () => {
      setIsHovering(false);
    };


  return (
    <div className="modal-styles">
      <button onClick={onClose} className="close-button">
        {/* <Icon name="close" /> */}
        X
      </button>

      <div className="business-info-div">
        <img src={placeholderImg} className="business-img" alt="business" />

        <div>
          <h3>{name}</h3>
          <p>{address}</p>
          <img
          src={require(`../../../../Assets/img/yelp-stars/${rating}.png`)}
          alt=" Stars"
        />
          {/* <p>{rating}</p> */}
          <p>{phone}</p>
          <button className='button-modal' onClick={(e) => {
            e.preventDefault();
            window.open(url)
          }}>Business Website <span><FaSearch /></span></button>            
        </div>

        <div className='experience-choice-dropdown' tabIndex="1"   onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <label for="experience-selection">Select your experience:</label>
          <select className='selectio-box' name="experience-selection" id="experience-selection"  onChange={onExperienceDecision}>
            {restaurantExperienceData.myExperiences?.map(e => {
              return (
                <option value={e._id}>{e.createdAt}</option>
              )
            })}
          </select>

          {isHovering && <p>To add this restaurant to your night in, select the 'Experience' in the dropdown that matches today's date.</p>}
        </div>

        <div>
          <button className='button-modal' onClick={chooseRestaurantButtonClick}>Choose this Restaurant<span><FaHandPointUp /></span></button>            
        </div>

        <div className='map'>
           <iframe title="location" src={uriAddress} height="400" width ="800"></iframe>
        </div>
      </div>
    </div>
  );
}
