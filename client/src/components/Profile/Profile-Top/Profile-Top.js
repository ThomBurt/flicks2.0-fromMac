import React, { useState, useMemo } from 'react';
import {useQuery} from '@apollo/react-hooks';
//import omitDeep from 'omit-deep';

import { RiPencilFill } from 'react-icons/ri';

import './profile-top.css';

import { PROFILE } from '../../../utils/queries';


const ProfileTop = () => {

    const [values, setValues] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        images: [],
        headline: '',
        createdAt: ''
    });



    const {data} = useQuery(PROFILE);

    useMemo(()=> {
        if (data) {
           // console.log(data.profile)
            setValues({
                username: data.profile.username,
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                email: data.profile.email,
                images: data.profile.images,
                headline: data.profile.headline,
                createdAt: data.profile.createdAt
            });
        }
    }, [data]);


   //destructure
   const { username, firstName, lastName, email, images, headline, createdAt } = values;

//    const image = () => {
//        console.log(images)
//    }
//    image()

    return (
        <div className='main-my-profile-div'>
            <div className='my-profile-main'>
                <div className='top-profile-bar'>
                    <div className='image-and-header'>
                        <div>
                            {/* <img className="my-profile-img" src={images[0].url} alt="profile-pic"></img> */}
                            {images.map((image) => (
                            <img
                                src={image.url}
                                key={image.public_id}
                                alt={image.public_id}
                                className="my-profile-img"
                            />
                        ))}
                        </div>
                        <div> 
                            <div>
                                <h1>{firstName} {lastName}</h1>
                                <h5>@{username}</h5>
                                <h5>{email}</h5>
                                <p>{headline}</p>
                            </div>
                        </div>
                    </div>
                    <div className='overall-button-div'>
                        <div className='button-div-header'>
                            <button className='button-edit-profile'     onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/update-profile';
                                }}><span><RiPencilFill/> </span>Edit Profile
                            </button>
                            <p>Been 'Flicks-ing' since <span className='createdAtSpan'>{createdAt.slice(0, 4)}</span></p>
                        </div>
                    </div>

                </div>
             </div>
        </div>
    )
}

export default ProfileTop;