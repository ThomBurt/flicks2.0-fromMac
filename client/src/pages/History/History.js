import React, { useState, useEffect } from 'react';

import { useQuery } from "@apollo/client";

// import HistoryExperience from '../../components/History/HistoryExperience';
import HistoryDB from '../../components/History/HistoryDB';

import { PROFILE_W_EXPERIENCES } from '../../utils/queries';

import './History.css';

//import {Spinner} from '../../components/Yelp/Spinner/Spinner';


const History = () => {

    const [experiences, setExperiences] = useState({})


    const {data} = useQuery(PROFILE_W_EXPERIENCES);
    //console.log(data)


    useEffect(()=> {
        if (data) {
           // console.log(data.profile)
           setExperiences({
                data: data.profileWithExperiences.experiences
            });
        }
    }, [data]);

    console.log(experiences.data)

    // const test = experiences.data;
    // console.log(test)

    // let searchResults = null;

  //  let searchResults = experiences;
     let searchResults = experiences.data?.map(e => <HistoryDB key={e._id} experience={e}/>);
    

    return(
        <div>
           <div className='mainHistoryBG'>
                <div className='mainContainerHistory'>
                    <div className='historyTitle'>
                        <h1>Your History</h1>
                    </div>

                    <div className='experiencesContainer'> 
                        {searchResults} 
                    </div>
                </div>

           </div>
        </div>
    )
}

export default History;