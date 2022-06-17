import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import axios from 'axios';
import Resizer from "react-image-file-resizer";



import './Login/Signup.css';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', firstName: '', lastName: '', email: '', password: '', images: [] });

  const [addUser, { error}] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const { name, value } = event.target;
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
              )
              .then(response => {
                console.log('Cloudinary Upload', response)
              })
              .catch(error => {
                  console.log('Upload failed', error)
              })
            },
            "base64"
            );
        } catch (err) {
            console.log(err);
        }
    }
    setFormState({
      ...formState,
      [name]: value,
    });
}

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='main-div'>
      <div className='div-to-center-all'>
        <div className='div-under-main'>
          <div className='object-div'>
            <h4 className='h4-title'>Sign Up</h4>
            <div className='form-div'>
              <form onSubmit={handleFormSubmit}>
                <input
                  className='pw-input'
                  placeholder='Your username'
                  name='username'
                  type='username'
                  id='username'
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className='pw-input'
                  placeholder='First Name'
                  name='firstName'
                  type='firstName'
                  id='firstName'
                  value={formState.firstName}
                  onChange={handleChange}
                />
                <input
                  className='pw-input'
                  placeholder='Last Name'
                  name='lastName'
                  type='lastName'
                  id='lastName'
                  value={formState.lastName}
                  onChange={handleChange}
                />
                <input
                  className='pw-input'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  id='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className='pw-input'
                  placeholder='******'
                  name='password'
                  type='password'
                  id='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <input 
                  value={formState.images}
                  name="images"
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange} 
                  className="pw-input" 
                  placeholder='Image' >
                </input>
                <button className='submit-button-login' type='submit'>
                  Submit
                </button>
                <div className='sign-up-link'>
                  <a href='/login' className='actual-signup-button'>
                    Already a member? Log In
                  </a>
                </div>
              </form>
              {error && <div>Sign up failed</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;