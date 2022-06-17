import React from 'react';

import './Post.css';

const Post = () => {
    return (
        <div className='main-post-div'>
            <div>
                <div>
                    <textarea placeholder="What's on your mind?" className='text-box'></textarea>
                </div>
                <div>
                    <button className='post-button-submit'>Post</button>
                </div>
            </div>
        </div>
    )
}

export default Post;