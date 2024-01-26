import '../CSS/Pages.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {message} from 'antd';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Telephone, Person, Envelope, Calendar, GenderMale, GenderFemale } from 'react-bootstrap-icons';


const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [phone, setPhone] = useState('');
  const [Dob, setDob] = useState('');
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/v1/user/getUserInfo`,
        { userId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.data.success) {
        setUserData(res.data.data);
        setPhone(res.data.data.PhoneNumber || '');
        if (res.data.data.DOB) {
          setDob(
            new Date(res.data.data.DOB).toISOString().split('T')[0]
          );
          calculateAge(res.data.data.DOB);
        } else {
          setDob('');
          setAge(null);
        }
        setGender(res.data.data.Gender || '');
      }
    } catch (error) {
      console.log(error);
      console.error("Error fetching user info:", error);
    }
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const ageDiff = today.getFullYear() - dobDate.getFullYear();
    if (
      today.getMonth() < dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() &&
        today.getDate() < dobDate.getDate())
    ) {
      setAge(ageDiff - 1);
    } else {
      setAge(ageDiff);
    }
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
    calculateAge(e.target.value);
  };


  const handleUpdate = (e) => {
    e.preventDefault();
     
     axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/user/updateprofile`,
        {
          userName: userData.userName,
          email: userData.email,
          PhoneNumber: phone,
          Gender: gender,
          DOB: Dob,
          Age: age,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        if(response.data.success)
        {
          message.success('Profile updated Successfully')
        }
        else
        {
          message.error('Error in profile update')
        }
        if (!response.error) setEditMode(!editMode);
      })
      .catch((err) => {
        console.log('Enter Valid Details...');
      });
  };
  

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully...');
    navigate('/');
  };

  useEffect(() => {
    getUserInfo();

    //eslint-disable-next-line
  }, [id]);

  return (
    <div className='container-class container-fluid text-white min-vh-100'>
  {userData ? (
    <>
      <div className='container py-5'>
        <div className='row align-items-center'>
          <div className='col-md-6'></div>
          <div className='col-md-6 text-md-end'>
            <button
              className='btn btn-outline-light bg-danger'
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-left me-2"></i> Logout
            </button>
          </div>
        </div>

        <div className='bg-light p-4 mt-4 rounded'>
          <form onSubmit={handleUpdate}>
            <div className='mb-3 text-center'>
                <h3 className='text-dark' style={{ fontFamily:  "'Garamond', 'Baskerville', 'Baskerville Old Face', 'Hoefler Text', 'Times New Roman', serif" }}>
                   <strong>Profile Page</strong>
                 </h3>
              </div>
            <div className='mb-3 row'>
              <label className='form-label text-dark col-md-3'>
                <Person className='me-2' /> <strong>Name</strong>
              </label>
              <div className='col-md-9'>
                <input
                  className={`form-control ${editMode ? 'border-1' : 'border-0'}`}
                  type='text'
                  style={{borderColor : '#c0c0c0'}}
                  value={userData.name || ''}
                  name='name'
                  disabled
                  
                />
              </div>
            </div>

            <div className='mb-3 row'>
              <label className='form-label text-dark col-md-3'>
                <Envelope className='me-2' /> <strong>Email</strong>
              </label>
              <div className='col-md-9'>
                <input
                  className={`form-control ${editMode ? 'border-1' : 'border-0'}`}
                  type='text'
                  value={userData.email || ''}
                  name='email'
                  style={{borderColor : '#c0c0c0'}}
                  disabled
                />
              </div>
            </div>

            <div className='mb-3 row'>
              <label className='form-label text-dark col-md-3'>
                <Telephone className='me-2' /> <strong>Phone</strong>
              </label>
              <div className='col-md-9'>
                <input
                  className={`form-control ${editMode ? 'border-1' : 'border-0'}`}
                  type='text'
                  value={phone || ''}
                  name='phone'
                  style={{borderColor : '#c0c0c0'}}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!editMode}
                />
              </div>
            </div>

            <div className='mb-3 row'>
              <label className='form-label text-dark col-md-3'>
                {gender === 'male' ? <GenderMale className='me-2' /> : <GenderFemale className='me-2' />}
                <strong>Gender</strong>
              </label>
              <div className='col-md-9'>
                <select
                  className={`form-select ${editMode ? 'border-1' : 'border-0'}`}
                  value={gender || ''}
                  name='gender'
                  style={{borderColor : '#c0c0c0'}}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!editMode}
                >
                  <option value=''>Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
            </div>

            <div className='mb-3 row'>
              <label className='form-label text-dark col-md-3'>
                <Calendar className='me-2' /> <strong>DOB</strong>
              </label>
              <div className='col-md-9'>
                <input
                  className={`form-control ${editMode ? 'border-1' : 'border-0'}`}
                  type='date'
                  value={Dob || ''}
                  name='dob'
                  style={{borderColor : '#c0c0c0'}}
                  onChange={handleDobChange}
                  disabled={!editMode}
                />
              </div>
            </div>

            <div className='mb-3 row'>
              <label className='form-label text-dark col-md-3'>
                <i className="bi bi-asterisk p-1"></i> <strong>Age</strong>
              </label>
              <div className='col-md-9'>
                <input
                  className={`form-control ${editMode ? 'border-1' : 'border-0'}`}
                  type='number'
                  value={age || ''}
                  name='age'
                  style={{borderColor : '#c0c0c0'}}
                  disabled
                />
              </div>
            </div>

            <div className='d-grid gap-2 justify-content-center'>
              <button
                type='button'
                className={`btn ${editMode ? 'btn-secondary' : 'btn-primary '}`}
                style={{ width: '200px' }}
                onClick={handleEditClick}
              >
                {editMode ? 'Cancel' : 'Modify'}
              </button>
              <button
                type='submit'
                className='btn btn-primary '
                style={{ width: '200px' }}
                disabled={!editMode}
                hidden={!editMode}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  )}
</div>

  
  
  
  );
};

export default Profile;
