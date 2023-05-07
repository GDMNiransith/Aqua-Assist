import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

function Login() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      // Navigate to AdminDashboard
      navigate('/AdminDashboard');
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage
              src='https://i.pinimg.com/originals/40/cb/1a/40cb1a8796c780d53a1cabfd7f985f84.jpg'
              alt="login form"
              className='rounded-start w-100'
            />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <span className="h1 fw-bold mb-0">Log In</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Sign into your account
              </h5>

              <form onSubmit={handleLogin}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='username'
                  id='formControlLg'
                  type='text'
                  size="lg"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  size="lg"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' type="submit">Login</MDBBtn>
              </form>

             
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
