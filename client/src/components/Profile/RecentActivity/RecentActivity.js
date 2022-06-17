import React from 'react';

import { FaRegThumbsUp } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa';

import './RecentActivity.css';

const RecentActivity = () => {
    return (
            <div  className='recent-activity-div'>
                <div className=''>
                    <h1>Recent Activity</h1>
                </div>
                <div>
                    <div className='experience-profile-div'>
                        <div>
                            <h3>12/02/2022</h3>
                        </div>
                        <div className='experience-image-profile-div'>
                            <div>
                                <img src="https://via.placeholder.com/180" alt="experience"></img>
                                <h3>Movie</h3>
                                <h5>Pirate Of The Caribeann</h5>
                            </div>
                            <div>
                                <img src="https://via.placeholder.com/180" alt="experience"></img>
                                <h3>Dinner</h3><h5>Bru Burger</h5>
                            </div>
                            <div>
                                <img src="https://via.placeholder.com/180" alt="experience"></img>
                                <h3>Drink</h3>
                                <h5>Mojito</h5>
                            </div>
                        </div>
                        <div className='interaction-div'>
                            <div className='like-comment-divs'>
                                <p><span><FaRegThumbsUp /></span> Like</p>
                            </div>
                            <div className='like-comment-divs'>
                                <p><span><FaRegCommentDots /></span> Comment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default RecentActivity;