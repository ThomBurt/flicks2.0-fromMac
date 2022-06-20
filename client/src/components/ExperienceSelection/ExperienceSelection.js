import React, { useState, useEffect } from 'react';

import { GET_ME } from '../../utils/queries';

import { useQuery, useMutation } from '@apollo/client';


const ExperienceSelection = () => {

  
    //console.log(experienceData)

    const {data} = useQuery(GET_ME);
 
    useEffect(()=> {
      if (data) {
         //  console.log(data)
          setRestaurantExperienceData({
            myExperiences: data.me.experiences 
          })
      }
  }, [data]);

  const [restaurantExperienceData, setRestaurantExperienceData] = useState([])

  console.log(restaurantExperienceData)
  
    return(
        <div className='experience-choice-dropdown' tabIndex="1">
        <label for="experience-selection">Select your experience:</label>
          <select className='selectio-box' name="experience-selection" id="experience-selection" >
            {restaurantExperienceData.myExperiences?.map(e => {
              return (
                <option value={e._id}>{e.createdAt}, ({e._id})</option>
              )
            })}
          </select>
        </div>
    )
}


export default ExperienceSelection;