import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import { ToastContainer, toast } from 'react-toastify';
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
}
from 'mdb-react-ui-kit';

function Login() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();



   
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address');
      notify1();
      return;
    }

    if (password.length < 7) {
      setErrorMessage('Password must be at least 8 characters long');
      notify1();
      return;
    }

    console.log('Logging in with email:', email, 'and password:', password);
    setErrorMessage('');
    
    
    axios.post("http://localhost:4000/login/check", {
      email,
      password
    })
   
      .then(response => {
        console.log(response.data);
        setToken(response.data.token); 
        localStorage.setItem("user", JSON.stringify(response.data.token));
        notify();
        navigate('/myprofile'); 
      })
      .catch(error => {
        console.log(error);
        setErrorMessage('Incorrect email or password');
      });
    const notify1 = () =>toast.error('😥try Again!! ', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    const notify = () =>toast.success('🦄 SuccessFull', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };
  
  
  return (
 <form onSubmit={handleLogin}>
      <MDBContainer className="my-5" >

    <MDBCard>
  <MDBRow className='g-0'>
  

    <MDBCol md='6'>
      <MDBCardImage src='https://i.pinimg.com/originals/40/cb/1a/40cb1a8796c780d53a1cabfd7f985f84.jpg' alt="login form" className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          
          <span className="h1 fw-bold mb-0">Log In</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

          <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" onChange={(e) => setEmail(e.target.value)}
                required   />
          <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" onChange={(e) => setPassword(e.target.value)}
                required/>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <MDBBtn className="mb-4 px-5" color='dark' size='lg' >Login</MDBBtn>
        <ToastContainer />
        
        <a className="small text-muted" href="/forgotpassword">Forgot password?</a>
        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/register" style={{color: '#393f81'}}>Register here</a></p>

        <div className='d-flex flex-row justify-content-start'>
          <a href="#!" className="small text-muted me-1">Terms of use.</a>
          <a href="#!" className="small text-muted">Privacy policy</a>
        </div>

      </MDBCardBody>
    </MDBCol>
    
  </MDBRow>
</MDBCard>
</MDBContainer>
</form>

  );

}
 


export default Login;
