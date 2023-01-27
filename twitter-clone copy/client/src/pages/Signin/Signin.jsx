import React, { useState } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailed} from '../../redux/userSlice'

import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();    
    const navigate = useNavigate();

    //sign in user on click
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("http://localhost:8000/api/auth/signin", {username, password}); //on click we pass username and password in body and post to login
            dispatch(loginSuccess(res.data)); // using redux to manage state for the person who signs in
            navigate('/'); // navigate to home page after sign in
        } catch (err) {
            dispatch(loginFailed());
        }
    };

    //sign up user on click
    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const res = await axios.post("http://localhost:8000/api/auth/signup", {
                username, 
                email, 
                password
            });
            dispatch(loginSuccess(res.data)); // using redux to manage state for the person who signs up
            navigate('/'); // navigate to home page after sign up
        } catch (err) {
            dispatch(loginFailed());
        }
    };

  return (
    <div>
        <form className='bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-5'>
            <h2 className='text-2xl font-bold text-center'>Sign into Twitter</h2>

            <input 
            onChange={(e) => setUsername(e.target.value)}
                type="text" 
                placeholder='Username'
                className='text-base py-2 rounded-full px-4' 
            />
            <input 
            onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder='Password'
                className='text-base py-2 rounded-full px-4' 
            />

            <button 
            className='text-base py-2 font-bold rounded-full px-4 bg-blue-500 text-white'
            onClick={handleLogin}
            >
                Sign in
            </button>

            <p className='text-center text-sm mt-6'>Don't have an account?</p>

            <input 
            onChange={(e) => setUsername(e.target.value)}
                type="text" 
                placeholder='Username'
                className='text-base py-2 rounded-full px-4' 
            />
            <input 
            onChange={(e) => setEmail(e.target.value)}
                type="email" 
                placeholder='email'
                required
                className='text-base py-2 rounded-full px-4' 
            />
            <input 
            onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder='Password'
                className='text-base py-2 rounded-full px-4' 
            />
            <button 
            onClick={handleSignup}
                className='text-base py-2 font-bold rounded-full px-4 bg-blue-500 text-white' 
                type='submit'>
                    Sign up
            </button>
        </form>
    </div>
  )
}

export default Signin