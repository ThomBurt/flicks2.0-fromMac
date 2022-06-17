import React, { useState, useMemo } from 'react';
import {useQuery} from '@apollo/react-hooks';
//import omitDeep from 'omit-deep';

import { PROFILE } from '../../../utils/queries';

import { Link } from 'react-router-dom';

import { RiLockPasswordLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { FaUserFriends } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { BsHouseDoor } from 'react-icons/bs';
import { VscEdit } from 'react-icons/vsc';

import './Profilenav.css';



const ProfileNav = () => {

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
   const { username, firstName, lastName, images } = values;

    return (
        <div className='main-div-updateProfile'>
            <div>
                <nav className="menu" tabIndex="0">
                        <div className="smartphone-menu-trigger"></div>
                    <header className="avatar">
                        {images.map((image) => (
                                <img
                                    src={image.url}
                                    key={image.public_id}
                                    alt={image.public_id}
                                    className="profile-img"
                                />
                            ))}
                            <h1>{firstName} {lastName}</h1>
                            <h5>@{username}</h5>
                    </header>
                        <ul className='updateProfileUl'>

                            <li tabIndex="0" className='updateProfileLi'>
                                <Link to="/my-profile" style={{color: 'black', textDecoration: 'none'}} onClick={event => window.location.href='/my-profile'}>
                                    <span>Profile</span> <span><CgProfile /></span>
                                </Link>
                            </li>

                            <li tabIndex="0" className='updateProfileLi'>
                                <Link to="/update-profile" style={{color: 'black', textDecoration: 'none'}} onClick={event => window.location.href='/update-profile'}>
                                    <span>Update Profile</span> <span><VscEdit /></span>
                                </Link>
                            </li>

                            <li tabIndex="0" className='updateProfileLi'>
                                <Link to="/history" style={{color: 'black', textDecoration: 'none'}} onClick={event => window.location.href='/history'}>
                                    <span>Experiences</span> <span><BsHouseDoor/></span>
                                </Link>
                            </li>

                            <li tabIndex="0" className='updateProfileLi'>
                                <Link to="/forgot-password" style={{color: 'black', textDecoration: 'none'}} onClick={event => window.location.href='/forgot-password'}>
                                    <span>Password</span> <span><RiLockPasswordLine /></span>
                                </Link>
                            </li>

                            <li tabIndex="0" className='updateProfileLi'>
                                <Link to="/friends" style={{color: 'black', textDecoration: 'none'}}  onClick={event => window.location.href='/friends'}>
                                    <span>Friends</span> <span><FaUserFriends /></span>
                                </Link>
                            </li>

                            <li tabIndex="0" className='updateProfileLi'>
                                <Link to="/settings" style={{color: 'black', textDecoration: 'none'}} onClick={event => window.location.href='/settings'}>
                                    <span>Settings</span> <span><FiSettings/></span>
                                </Link>
                            </li>
                        </ul>
                </nav>
            </div>
        </div>
    )
}

export default ProfileNav;