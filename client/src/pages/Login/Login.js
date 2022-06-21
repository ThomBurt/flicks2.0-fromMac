import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './Login.css';

export const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });
  
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    // setFormState({
    //   email: '',
    //   password: '',
    // });
  };

  return (
    <main className='main-div'>
      <div className='div-under-main'>
        <div className=''>
          <h4 className='h4-title'>Login</h4>
          <div className='form-div'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='email-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='pw-input'
                placeholder='Password'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='submit-button-login' type='submit'>
                Submit
              </button>
              <div className='sign-up-link'>
                <a href='/signup' className='actual-signup-button'>
                  Not a member yet? Sign up!
                </a>
              </div>
            </form>
            {error && <div className='card-text'>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;