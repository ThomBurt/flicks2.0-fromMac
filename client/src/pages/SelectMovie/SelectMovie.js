import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { Redirect } from 'react-router-dom';
import { Spinner } from '../../components/Yelp/Spinner/Spinner';
import './SelectMovie.css';
//import { Streaming } from './Streaming/Streaming';
import axios from 'axios';
import { FiRefreshCw } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";

import { USER_UPDATE } from '../../utils/mutations';
import { ADD_EXPERIENCE } from '../../utils/mutations';
import { SAVE_MOVIE } from '../../utils/mutations';
//import { useQuery, useMutation } from '@apollo/react-hooks';
import { useQuery, useMutation } from '@apollo/client';

import { USER_TO_GET_EXPERIENCE_ID } from "../../utils/queries";
//import { EXPERIENCE } from '../../utils/queries';

//import { PROFILE } from '../../utils/queries';
import { GET_ME } from '../../utils/queries';



const SelectMovie = () => {

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
        setExperienceData({
          myExperiences: data.me.experiences 
        })
    }
}, [data]);

  const [id, setId] = useState("");
  //console.log(id.userId)

  const [experienceData, setExperienceData] = useState([])
  //console.log(experienceData)

  const {experienceChoiceForSaveMovie, setExperienceChoiceForSaveMovie} = useState("");



  const [isLoading, setIsLoading] = useState(false);

  const [formState, setFormState] = useState({ date: '', genre: '' });

  const [movieState, setMovieState] = useState({});

  const [streamingState, setStreamingState] = useState([{}]);




  // const [userUpdate, { error }] = useMutation(USER_UPDATE, {
  //   update(cache, { data: { userUpdate } }) {
  //     try {
  //       // update thought array's cache
  //       // could potentially not exist yet, so wrap in a try/catch
  //       const { movies } = cache.readQuery({ query: PROFILE });
  //       cache.writeQuery({
  //         query: PROFILE,
  //         data: { movies: [userUpdate, movies] },
  //       });

  //     } catch (e) {
  //       console.error(e);
  //     }
      
  //   }
  // })

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

  // const { title, year, plot, image } = movieState;

  const values = {
    title: movieState.title,
    year: movieState.year,
    plot: movieState.plot,
    image: movieState.image,
    //streaming: streamingState.name
  }

  if (!Auth.loggedIn()) {
   return <Redirect to="/login" />
 }

  var random;
  var max = 99
  function findRandom() {
    random = Math.floor(Math.random() * max)
    console.log(random)
  };





  const getMovie = async(props) => {
    setIsLoading(true);
    const inputDate = formState.date;
    const inputGenre = formState.genre;

    if(!formState) {
      return false;
    }

    // OMDB api call
    try {
      const response = await fetch(`https://imdb-api.com/API/AdvancedSearch/${process.env.REACT_APP_IMDB_APIKEY}/?title_type=feature&release_date=${inputDate}&genres=${inputGenre}&countries=us&languages=en&count=100`);

      const jsonData = await response.json();
      const selectedMovie = jsonData.results[random]


      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      
      const movieData = {
        movieId: selectedMovie.id,
        title: selectedMovie.title,
        year: selectedMovie.description,
        image: selectedMovie.image,
        plot: selectedMovie.plot,
        streaming: streamingState
      };
      //console.log(movieData);
      setMovieState(movieData);
      console.log(movieState);

      // takes the spinner off the page
      setIsLoading(false) 


      //local storage save
      localStorage.setItem("movieData", JSON.stringify(movieData))


      //RAPID API call start
      const optionsParams = {
        method: 'GET',
        url: 'https://mdblist.p.rapidapi.com/',
        params: [],
        headers: {
          'X-RapidAPI-Host': 'mdblist.p.rapidapi.com',
          'X-RapidAPI-Key': `${process.env.REACT_APP_X_RAPID_API_KEY}`,
        },
      };
      axios
        .request({
            ...optionsParams,
            params: { s: `${movieData.title}`}
          })
        .then(function (response) {
          console.log(response.data);


          //Find Match within API Array
          const movieMatch = response.data.search.filter(movie => {
            return movie.title.includes(movieData.title)
          });
          console.log(movieMatch);


          //Find TraktID
          const traktid = movieMatch[0].traktid;
          const traktidOptions = {
              ...optionsParams,
              params: { t: `${traktid}` }
          };
          axios.request(traktidOptions).then(function (response) {
    
            const streamingServices = response.data.streams;
            setStreamingState(streamingServices);
            //console.log(streamingState);
            console.log(response.data.streams)
  
            let temporaryArray = [];
  
            for (let i = 0; i < response.data.streams.length; i++){
  
              temporaryArray.push(response.data.streams[i].name)
              console.log(temporaryArray);

           }
           //set streaming state
           setStreamingState(streamingState => [...streamingState, `${temporaryArray}`])
   
            if (streamingState) {
              console.log(streamingState)
            } else return null;
          })
        })
             
    } catch (err) {
      console.error(err);
    }
  };
  
  //const streamingOutput = streamingState.map(item => <div style={{"marginRight" : "10px"}} key={item.name}>{item.name}</div>)
  //console.log(data)
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


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    findRandom();

    getMovie();

    addNewExperience();

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);

    // userUpdate({variables: {input: values}})
  };

  const onExperienceDecision = (event) => {
    const experienceIdChoice = event.target.value;
    // setExperienceChoiceForSaveMovie({
    //   newExperienceId: experienceIdChoice
    //   });
      console.log(experienceIdChoice)
  }


  const onRefresh = async (e) => {
    e.preventDefault();
    findRandom();
    getMovie();
  }

  const onGoBack = async(e) => {
    e.preventDefault();
    window.location.href='/movie';
  }



  return (

    <main className='main-body'>
        {isLoading ? <Spinner /> : getMovie}
        {!movieState.title
        ?
      <div style={{display: !isLoading ? "display" : "none"}} className="div-body-under-main" id="selectMovieDiv">
        <h2 className="">Select your movie!</h2>
        <div className="">
        <form onSubmit={handleFormSubmit}>
          <div className="dropdown-div">
            <label className="form-title" htmlFor="genre">Genre:</label>
            <select
              className="genre-dropbox"
              name="genre"
              id="genre"
              onChange={handleChange}
            >
              <option value="">Please select a genre</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="animation">Animation</option>
              <option value="biography">Biography</option>
              <option value="comedy">Comedy</option>
              <option value="crime">Crime</option>
              <option value="drama">Drama</option>
              <option value="family">Family</option>
              <option value="fantasy">Fantasy</option>
              <option value="film_noir">Film-Noir</option>
              <option value="history">History</option>
              <option value="horror">Horror</option>
              <option value="music">Music</option>
              <option value="musical">Musical</option>
              <option value="mystery">Mystery</option>
              <option value="news">News</option>
              <option value="romance">Romance</option>
              <option value="sci_fi">Sci-Fi</option>
              <option value="sport">Sport</option>
              <option value="thriller">Thriller</option>
              <option value="war">War</option>
              <option value="western">Western</option>

            </select>
          </div>
          <div className="year-range-div">
            <label className="year-text" htmlFor="date">Year Range:</label>
            <select
              className="genre-dropbox"
              name="date"
              id="date"
              onChange={handleChange}
            >
              <option value="">Please select a year range</option>
              <option value="2010-01-01,">2010 - Today</option>
              <option value="1990-01-01,2010-01-01">1990 - 2010</option>
              <option value="1970-01-01,1990-01-01">1970 - 1990</option>
              <option value="1950-01-01,1970-01-01">1950 - 1970</option>
              <option value="1930-01-01,1950-01-01">1930 - 1950</option>
            </select>
          </div>
          <div className="submit-button-div">
            <button disabled={isLoading} className='submit-button' type="submit">Submit</button>
          </div>
        </form>
        </div>
      </div>

      : <div className='main-results-div'>
        <div className='refresh-div'>
          <button className='refresh-button-movie' onClick={onGoBack}><RiArrowGoBackFill /></button>
          <button className='refresh-button-movie' onClick={onRefresh}><FiRefreshCw /></button>
        </div>
        <h1>TONIGHT YOU'RE WATCHING</h1>
        <div className="movie-card">
          <h3 className="movie-card-header">{movieState.title} {movieState.year}</h3>
          <div className="movie-card-body">
            <img className="movie-img" src={movieState.image} alt="movie"/>
            <p>{movieState.plot}</p>
          </div>
          <div className='streaming' id="streaming">
            <h4 style={{"marginRight" : "10px"}}>Available on:</h4>
            {/* {streamingOutput} */}
            {streamingState.map(item => <div style={{"marginRight" : "10px"}} key={item}>{item.name}</div>)}
            
          </div>
        </div>

        <div className='experience-choice-dropdown' tabIndex="1">
        <label for="experience-selection">Select your experience:</label>
          <select className='selectio-box' name="experience-selection" id="experience-selection" onChange={onExperienceDecision}>
            {experienceData.myExperiences.map(e => {
              return (
                <option value={e._id}>{e.createdAt}, ({e._id})</option>
              )
            })}
          </select>
        </div>

        <div className='button-to-dinner'>
          <a href='/dinner' className='submit-button-dinner'>
            Now pick dinner!
          </a>
        </div>
      </div>
      }

    </main>
  );
}
export default SelectMovie;