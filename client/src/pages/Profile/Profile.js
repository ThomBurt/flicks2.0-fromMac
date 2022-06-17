import React, { useState, useEffect, Fragment } from 'react';
//import { AuthContext } from '../../Context/authContext';
import { toast } from 'react-toastify';
import {useQuery, useMutation} from '@apollo/react-hooks';
// import {gql} from 'apollo-boost';
//import omitDeep from 'omit-deep';
import axios from 'axios';
import Resizer from "react-image-file-resizer";

import ProfileNav from '../../components/Profile/ProfileNav/ProfileNav';
import ProfileTop from '../../components/Profile/Profile-Top/Profile-Top';


import './Profile.scss';
//import RecentActivity from '../../components/Profile/RecentActivity/RecentActivity';

import { USER_UPDATE } from '../../utils/mutations';
import { PROFILE } from '../../utils/queries';

//import Auth from '../../utils/auth';

const MyProfile = () => {

    const [values, setValues] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        images: [],
        headline: '',
    });

    const [loading, setLoading] = useState(false);

    const {data} = useQuery(PROFILE);

    useEffect(()=> {
        if (data) {
            console.log(data.profile)
            setValues({
               // ...values,
                username: data.profile.username,
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                email: data.profile.email,
                //images: omitDeep(data.profile.images, ["__typename"]),
                images: data.profile.images,
                headline: data.profile.headline,
            });
        }
    }, [data]);

    //mutation
    const [userUpdate] = useMutation(USER_UPDATE, {
        update: ({ data }) => {
            console.log('USER UPDATE MUTATION IN PROFILE', data);
            toast.success('Profile updated')
        }
    })

    //destructure
    const { username, firstName, lastName, email, images, headline } = values;

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        userUpdate({variables: {input: values}})
        setLoading(false)
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value })
    }

    const handleImageChange = (event) => {
        var fileInput = false;
            if (event.target.files[0]) {
            fileInput = true;
            }
            if (fileInput) {
            try {
                Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    console.log(uri);
                    axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`, {
                        image: uri
                    }, 
                    // {
                    //     headers: {
                    //         authtoken: state.user.token
                    //     }
                    // }
                  )
                  .then(response => {
                    setLoading(false)
                    console.log('Cloudinary Upload', response)
                    setValues({ ...values, images: [response.data] })                   
                  })
                  .catch(error => {
                      setLoading(false)
                      console.log('Upload failed', error)
                  })
                },
                "base64"
                );
            } catch (err) {
                console.log(err);
            }
        }
    }

    const profileImage = () => {
         <div>
            {/* <img src={images[0].url} alt="img" className="thom-img">
            </img> */}
            {images.map((image) => (
                <img
                    src={image.url}
                    key={image.public_id}
                    alt={image.public_id}
                    style={{ height: '100px' }}
                    className="json-div-test"
                />
            ))}
        </div>
    }

    return (
        <div className='main-my-profile-div'>
            <div>
                <ProfileNav />
            </div>
            <div>
                <ProfileTop />
            </div>
            <div  className='main-post-div-profile'>
                <div className='post-div-under-main'>
                                <div className='recent-act-div-profile'>
                                    {/* <RecentActivity /> */}
                                   {profileImage}
                                </div>
                                {/* <div className='post-div'>
                                    <Post />
                                </div> */}

                                 <div className='overall-form-container'> 
   
                                        <form onSubmit={handleSubmit}>
                                        {/* <h1>Update Profile</h1> */}
                                            <div className='input-div'>
                                                    <label>Images</label>
                                                    <input 
                                                        name="images"
                                                        //value={images}
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={handleImageChange} 
                                                        className="image-input-form-update-profile" 
                                                        placeholder='Image' >
                                                    </input>
                                                </div>
                                                {/* <div className='image-profile'>
                                                    <div class="dashes"></div>
                                                    <label>Click to browse or drag an image here</label>
                                                </div> */}
                                                <div className='input-div'>
                                                    <label>Username</label>
                                                    <input 
                                                        type="text" 
                                                        name="username" 
                                                        value={username || ''} 
                                                        onChange={handleChange} 
                                                        className="input-form-update-profile" 
                                                        placeholder='Username' 
                                                        disabled={loading}>
                                                    </input>
                                                </div>
                                                <div className='input-div'>
                                                    <label>First Name</label>
                                                    <input 
                                                        type="text" 
                                                        name="firstName" 
                                                        value={firstName || ''} 
                                                        onChange={handleChange} 
                                                        className="input-form-update-profile" 
                                                        placeholder='First Name' 
                                                        disabled={loading}>
                                                    </input>
                                                </div>
                                                <div className='input-div'>
                                                    <label>Last Name</label>
                                                    <input 
                                                        type="text" 
                                                        name="lastName" 
                                                        value={lastName || ''} 
                                                        onChange={handleChange} 
                                                        className="input-form-update-profile" 
                                                        placeholder='Last Name' 
                                                        disabled={loading}>
                                                    </input>
                                                </div>
                                                <div className='input-div'>
                                                    <label>Email</label>
                                                    <input 
                                                        type="email" 
                                                        name="email" 
                                                        value={email || ''} 
                                                        onChange={handleChange} 
                                                        className="input-form-update-profile" 
                                                        placeholder='Email' 
                                                        disabled={loading}>
                                                    </input>
                                                </div>
                                                <div className='input-div'>
                                                    <label>Headline</label>
                                                    <textarea 
                                                        name="headline" 
                                                        value={headline || ''} 
                                                        onChange={handleChange} 
                                                        className="input-form-update-profile" 
                                                        placeholder='Headline' 
                                                        disabled={loading}>
                                                    </textarea>
                                                </div>
                                                <div className='submit-button-div-update-form'>
                                                    <button className='submit-button-update-profile' type="submit" disabled={!email || loading}>Submit</button>
                                                </div>
                                        </form>
                                    </div>
                            </div>
                </div>
                {/* <div className="json-div-test">{JSON.stringify(values)}</div> */}
            </div>
    )
}

export default MyProfile;