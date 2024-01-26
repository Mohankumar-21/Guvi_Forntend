import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { BsPerson, BsPersonPlus } from 'react-icons/bs';

const Home = () => {
  return (
    <div className='main d-flex flex-column justify-content-between'>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 text-center mb-4">
            <h1 className="color-de display-4 ">Welcome to our Website!</h1>
            <p className="lead text-dark">Sign Up Now!.</p>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-column align-items-center">
  <div className="row">
    <div className="col-12 mb-3 col-md-6 col-lg-6">
      <div className="card back-color h-100">
        <div className="card-body text-center">
          <BsPerson size={50} color="blue" className="mb-3" />
          <h5 className="card-title">Login</h5>
          <p className="card-text">Click below to login to your account.</p>
          <Link to="/login" className="btn btn-primary mt-2">
            Login
          </Link>
        </div>
      </div>
    </div>

    <div className="col-12 mb-3 col-md-6 col-lg-6">
      <div className="card back-color h-100">
        <div className="card-body text-center">
          <BsPersonPlus size={50} color="green" className="mb-3" />
          <h5 className="card-title">Register</h5>
          <p className="card-text"> Hi! New to our website? Register here.</p>
          <Link to="/register" className="btn btn-success mt-2">
            Register
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>


      </div>
  
  );
};

export default Home;
