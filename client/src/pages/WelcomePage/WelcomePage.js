import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/client';

import { FaHandPointUp } from 'react-icons/fa';

import './WelcomePage.css';

import ICON from '../../components/Assets/img/icon-WHITE.png'

import { GET_ME } from '../../utils/queries';
import { USER_TO_GET_EXPERIENCE_ID } from "../../utils/queries";
import { ADD_EXPERIENCE } from '../../utils/mutations';

const WelcomePage = () => {

    const [id, setId] = useState("");
    //console.log(id.userId)


    const {data} = useQuery(GET_ME);
    // console.log(data)
   
     //const {experienceData} = useQuery( USER_TO_GET_EXPERIENCE_ID );
     //console.log(data)
   
     useEffect(()=> {
       if (data) {
           // console.log(data)
          setId({
           userId: data.me._id
           });
       }
   }, [data]);
   

     const [addExperience] = useMutation(ADD_EXPERIENCE, {
        update(cache, { data: { addExperience } }) {
          try {
                    // update thought array's cache
            // could potentially not exist yet, so wrap in a try/catch
            const { experience } = cache.readQuery({ query: USER_TO_GET_EXPERIENCE_ID  });
            // prepend the newest thought to the front of the array
            cache.writeQuery({
              query: USER_TO_GET_EXPERIENCE_ID ,
              data: { experiences: [addExperience, ...experience] },
            });
          } catch (e) {
            console.error(e);
          }
      }
    })

    const newUserId = (id.userId)
    //console.log(newUserId)
  
  
    const addNewExperience = async () => {
      try {
        await addExperience({
          variables: { id: newUserId }
        })
        console.log('experience added')
      } catch (e) {
        console.error(e);
      }
    }


    function handleButtonClick(event){
        event.preventDefault();
        addNewExperience();
        window.location.href='/movie'
    }


    return(
        <div className='welcome-page-main'>
            <div>
                <div className='welcome-icon-div'>
                <img src={ICON} className='logo' alt="food and flicks logo"></img>
                </div>
                <div>
                  <p>Click below to get started and start building your dream night in!</p>
                </div>
                <div className='welcome-button-div'>
                    <button className='welcome-button-getStarted' onClick={handleButtonClick} >Let's choose a movie! <FaHandPointUp /></button>
                </div>
            </div>
        </div>
    )
}


export default WelcomePage;