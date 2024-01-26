import React, {useState} from 'react';
import '../CSS/Pages.css';
import { Link, useNavigate } from 'react-router-dom';
import {message} from 'antd';
import axios from 'axios';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const LoginPage = () => {

  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async(e) =>
  {
      e.preventDefault();
     

      if ( !email || !password ) {
        message.error('Please fill in all fields');
        return;
      }

      try
      {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/user/login`, {email, password});
        if(res.data.success)
        {
          localStorage.setItem("token", res.data.token);
          message.success('Login Successfully');
          navigate('/profile');
        }
        else
        {
          message.error(res.data.message);
        }
      }
      catch(error)
      {
        console.log(error);
        message.error('Something went wrong');
      }
  }

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-info ' >
      
        <div className= 'form_container p-5 rounded bg-white' >
        <form onSubmit={onSubmitHandler}>
            <h3 className='text-center loginPage pb-2'>Login Page</h3>
            <div className='mb-2'>
               <label className='pb-1 bold'>Email </label>
               <input type='email'
                placeholder='enter your email...' 
                className='form-control'
                autoComplete='off'
                style={{borderColor : '#c0c0c0'}}
                onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div className='mb-2 pt-1'>
        <label className='pb-1 bold'>Password </label>
        <div className='input-group'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter password...'
            className='form-control'
            autoComplete='off'
            style={{ borderColor: '#c0c0c0' }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='button'
            className='btn btn-outline-secondary'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BsEye /> : <BsEyeSlash />}
          </button>
        </div>
      </div>

               
              <div className='mb-2 pt-2 pb-1'>
                <input type='checkbox' className='custom-control custom-check-box' id='check'/>
                <label htmlFor='check' className='custom-input-label ms-2'>
                   Remember Me
                </label>
              </div> 

             <div className='d-grid pt-1'>
                  <button className='btn btn-primary' type='submit'>Log In</button>
             </div> 
             
              <p className='text-center mt-3'><Link to='/register'>Register here...</Link></p>
        </form>
        </div>
    </div>
  )
}

export default LoginPage
