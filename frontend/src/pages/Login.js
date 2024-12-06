import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Optional, for icons
import axios from 'axios';

function App() {
  const navigate = useNavigate(); // React Router v6
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // If login is successful, store token and redirect
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard'); // Redirect to dashboard on successful login
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form h-100">
    <MDBRow className="h-100">
      {/* Left Section */}
      <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column ms-5 h-100 justify-content-center">
          <div className="text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              style={{ width: '185px' }} alt="logo" />
            <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
          </div>
  
          <p>Please login to your account</p>
  
          {/* Display error message */}
          {error && <div className="text-danger">{error}</div>}
  
          <MDBInput
            wrapperClass='mb-4'
            label='Email address'
            id='form1'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Password'
            id='form2'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          <div className="text-center pt-1 mb-5 pb-1">
            <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleLogin}>Sign in</MDBBtn>
            <a className="text-muted" href="#!">Forgot password?</a>
          </div>
  
          <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
            <p className="mb-0">Don't have an account?</p>
            <MDBBtn outline className='mx-2' color='danger' onClick={() => navigate('/register')}>
              Register
            </MDBBtn>
          </div>
        </div>
      </MDBCol>
  
      {/* Right Section */}
      <MDBCol col='6' className="mb-5 gradient-custom-2">
        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
          <h4 className="mb-4">We are more than just a company</h4>
          <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        </div>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  
  );
}

export default App;
