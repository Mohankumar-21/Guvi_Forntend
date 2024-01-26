import React, { useState } from 'react';
import '../CSS/Pages.css';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const onfinishHandler = async (e) => {
    e.preventDefault();

   
    if (!name || !email || !password || !confirmPassword) {
      message.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      message.error('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      message.error(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      );
      return;
    }

    if (password !== confirmPassword) {
      message.error('Password and Confirm Password do not match');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/user/register`, { name, email, password });

      if (res.data.success) {
        message.success('Register Successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error('Something went wrong');
      console.log(error);
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-info '>
      <div className='form_container p-5 rounded bg-white'>
        <form onSubmit={onfinishHandler}>
          <h3 className='text-center loginPage pb-2'>Register Page</h3>

          <div className='mb-2'>
            <label className='pb-1 bold'>Name </label>
            <input
              type='text'
              placeholder='Enter your name...'
              className='form-control'
              autoComplete='off'
              style={{borderColor : '#c0c0c0'}}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label className='pb-1 bold'>Email </label>
            <input
              type='email'
              placeholder='Enter your email...'
              className='form-control'
              autoComplete='off'
              style={{borderColor : '#c0c0c0'}}
              onChange={(e) => setEmail(e.target.value)}
            />
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

          <div className='mb-2 pt-1 bold'>
            <label className='pb-1'>Confirm Password </label>
            <div className='input-group'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Enter your password...'
                className='form-control'
                autoComplete='off'
                style={{ borderColor: '#c0c0c0' }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type='button'
                className='btn btn-outline-secondary'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ?  <BsEye /> : <BsEyeSlash /> }
              </button>
            </div>
          </div>

          <div className='d-grid pt-2'>
            <button className='btn btn-primary rounded' type='submit'>
              Register
            </button>
          </div>

          <p className='text-center mt-3'>
            <Link to='/login'>Login here...</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
