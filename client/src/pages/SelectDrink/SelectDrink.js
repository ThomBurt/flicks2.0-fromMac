import React, { useState, useEffect } from 'react';
import './SelectDrink.css';
// import { Icon } from 'semantic-ui-react';
import { FaBeer } from 'react-icons/fa';
import { FiRefreshCw } from "react-icons/fi";
import { BsArrowRightCircleFill } from "react-icons/bs";

import { GET_ME } from '../../utils/queries';

import { useQuery, useMutation } from '@apollo/client';

import { SAVE_DRINK } from '../../utils/mutations';

import { USER_TO_GET_EXPERIENCE_ID } from "../../utils/queries";


const SelectDrink = () => {
    const [drinkState, setDrinkState] = useState({});

    const [drinkExperienceData, setDrinkExperienceData] = useState([])
    //console.log(experienceData)
  
    const [experienceChoice, setExperienceChoice] = useState("");
  
  
    const {data} = useQuery(GET_ME);
   
     useEffect(()=> {
       if (data) {
           // console.log(data)
           setDrinkExperienceData({
             myDrinkExperiences: data.me.experiences 
           })
       }
   }, [data]);
  
   const [saveDrink] = useMutation(SAVE_DRINK, {
    update(cache, { data: { saveDrink } }) {
      try {
                // update thought array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { drink } = cache.readQuery({ query: USER_TO_GET_EXPERIENCE_ID  });
        // prepend the newest thought to the front of the array
        cache.writeQuery({
          query: USER_TO_GET_EXPERIENCE_ID ,
          data: { drinks: [saveDrink, ...drink] },
        });
      } catch (e) {
        console.error(e);
      }
  }
  })

  // console.log(drinkExperienceData)




    const getDrink = async() => {
    const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/random.php`);
    
    const jsonData = await response.json();
    const selectedDrink = jsonData.drinks[0];
    // const drinkName = jsonData.drinks[0].strDrink;

    console.log(jsonData);

    if (!response.ok) {
        throw new Error('something went wrong!');
      }
      
      const drinkData = {
        name: selectedDrink.strDrink,
        image: selectedDrink.strDrinkThumb,
        instructions: selectedDrink.strInstructions
      };
      console.log(drinkData);
      setDrinkState(drinkData);
      console.log(drinkState.name);

      // localStorage.setItem('drinkInfo', JSON.stringify(drinkData.name));
      // localStorage.setItem('drinkInfoImg', JSON.stringify(drinkData.image));

      localStorage.setItem("drinkData", JSON.stringify(drinkData))

  
    }
    
      // function to handle the experience dropdown choice
      const onExperienceDecision = (event) => {
        const experienceIdChoice = event.target.value;
        setExperienceChoice(experienceIdChoice);
          console.log(experienceChoice)
      }

    //Save movie to Experience
    const saveDrinkToExperience = async (event) => {
      // event.preventDefault();
      
        try {
          await saveDrink({
            variables: { 
              id: experienceChoice,
              name: drinkState.name,
              imageUrl: drinkState.image
            }
          })
          console.log('drink added')
        } catch (e) {
          console.error(e);
        }
    }



        const onSubmit = async (e) => {
          getDrink();
          
          let resultsDiv = document.getElementById('results-div');
          resultsDiv.classList.remove('div-hide');

          let buttonDiv = document.getElementById('main-button');
          buttonDiv.classList.add('div-hide');
      }

      const onRefresh = async (e) => {
        getDrink();
      }

      const onDrinkClick = async (e) => {
        e.preventDefault();
        saveDrinkToExperience();
       window.location.href='/history'
      }

    return(
        <main className='cocktail-main'>
            <div className='cocktail-button-div' id="main-button">
                <button className='btn d-block w-50 cocktail-button' onClick={(onSubmit)}>Click here to choose your Cocktail <FaBeer /></button>
            </div>


            : <div className='div-hide results-div' id="results-div">
                {/* <h2>TONIGHT YOU'RE WATCHING</h2> */}
                <div className="movie-card">
                  <div className="movie-card-header">
                  <h3 >{drinkState.name}</h3> 
                  <button className='refresh-button' onClick={(onRefresh)}><FiRefreshCw /></button>
                  <div className='refresh-text'>Refresh for a different choice</div>
                  </div>
                
                <div className="movie-card-body">
                    <img className="movie-img" src={drinkState.image} alt="drink"/>
                    <p>{drinkState.instructions}</p>
                </div>
                </div>

                <div className='experience-choice-dropdown' tabIndex="1">
                  <label >Select your experience:</label>
                    <select className='selectio-box' name="experience-selection" id="experience-selection" onChange={onExperienceDecision}>
                      {drinkExperienceData.myDrinkExperiences?.map(d => {
                        return (
                          <option value={d._id}>{d.createdAt}, ({d._id})</option>
                        )
                      })}
                    </select>
                </div>



                {/* <div className='link-btn mt-3'>
                <a href='/history' className='btn d-block w-100 p-3 cocktail-button'>
                    It's time to check out your evening! <BsArrowRightCircleFill />
                </a>
                </div> */}
                <button className='submit-button-dinner' onClick={onDrinkClick}>It's time to check out your evening!  <BsArrowRightCircleFill /></button>
            </div>
        </main>
    )
}

export default SelectDrink;