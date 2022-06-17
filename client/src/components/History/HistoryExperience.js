import React, { useState, useEffect } from 'react';

import './HistoryExperience.css';


const HistoryExperience = () => {

  //  const [historyDrinkImg, setHistoryDrinkImg] = useState([]);

    const [movieInfo, setMovieInfo] = useState({});
    const [restaurantInfo, setRestaurantInfo] = useState({});
    const [drinkInfo, setDrinkInfo] = useState({});



    useEffect(() => {
        fetchMovieData();
        fetchRestaurantData();
        fetchDrinkData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


   const fetchMovieData = async() => {
       if (!movieInfo || 'undefined') {
        let localStorageMovieInfo = window.localStorage.getItem("movieData");
        const movieData = (JSON.parse(localStorageMovieInfo));
        const movieName = (JSON.stringify(movieData.title));
        const movieImage = (JSON.stringify(movieData.image));
        setMovieInfo({
            ...movieData,
            name: movieName,
            image: movieImage
        })
        console.log(movieInfo)
       }
   }

   const fetchRestaurantData = async() => {
       if (!restaurantInfo.length || 'undefined') {
        let localStorageRestaurantInfo = window.localStorage.getItem("restaurantInfoObject");
        const restaurantData = (JSON.parse(localStorageRestaurantInfo))
        const restaurantName = (JSON.stringify(restaurantData.name));
        const restaurantImage = (JSON.stringify(restaurantData.image));
        setRestaurantInfo({
            ...restaurantInfo,
            name: restaurantName,
            image: restaurantImage
        }) 
        console.log(restaurantData)
       }
   }

   const fetchDrinkData = async() => {
    if (!drinkInfo.length || 'undefined') {
     let localStorageDrinkInfo = window.localStorage.getItem("drinkData");
     const drinkData = (JSON.parse(localStorageDrinkInfo))
     console.log(drinkData)
     const drinkName = (JSON.stringify(drinkData.name))
     const drinkImage = (JSON.stringify(drinkData.image))
     const drinkInstructions = (JSON.stringify(drinkData.instructions))
     setDrinkInfo({
         ...drinkInfo,
         name: drinkName, 
         image: drinkImage, 
         instructions: drinkInstructions
             })
    }
}

    const drinkImageProper = drinkInfo.image;

    return(
        <div className='experience'>
            <div className='createdAtHeading'>
                <h3>3rd June 2022</h3>
            </div>
            <div className='selection-container'> 
                 <div className='selection-div'>
                      <div>
                        <h4>
                           {movieInfo.name}
                        </h4>
                      </div>
                      <div>
                          <img className="moviePosterHistory" src="" alt="movieposter"></img>
                      </div>
                 </div>

                <div className='selection-div'>
                      <h4>
                         {restaurantInfo.name}
                      </h4>
                      <div>
                          <img className='restaurantHistoryImage' src="" alt="restaurantpic"></img>
                      </div>
                </div>

                <div className='selection-div'>
                    <div>
                        <h4>
                          {drinkInfo.name}
                        </h4>
                        <div>
                          <img className='drinkHistoryImage' src={`${drinkImageProper}`} alt="drinkpic"></img>
                      </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HistoryExperience;