import React from 'react'

import ProfileNav from '../ProfileNav/ProfileNav';
import ProfileTop from '../Profile-Top/Profile-Top';
//import Post from '../Post/Post';

import './myprofile.css';
import RecentActivity from '../RecentActivity/RecentActivity';


const MyProfile = () => {
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
                                    <RecentActivity />
                                </div>
                                {/* <div className='post-div'>
                                    <Post />
                                </div> */}
                            </div>
                </div>
            </div>
    )
}

export default MyProfile;