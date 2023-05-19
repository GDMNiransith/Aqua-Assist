import React, { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFile,
  MDBRadio,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emailRegex = /\S+@\S+\.\S+/;
const nicRegex = /^[0-9]{9}[vVxX]$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    email: '',
    password: '',
    nic: '',
    phoneNumber: '',
    file: null,
  });

  const notify = (message, type) => {
    toast[type](message, {
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

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      file: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert('Please enter a valid phone number.');
      return;
    }
    if (!nicRegex.test(formData.nic)) {
      alert('Please enter a valid NIC number.');
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      alert('Please enter a strong password (minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character).');
      return;
    }

    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('birthday', formData.birthday);
    form.append('gender', formData.gender);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('nic', formData.nic);
    form.append('phoneNumber', formData.phoneNumber);
    if (formData.file) {
      form.append('file', formData.file);
    }

    try {
      const response = await axios.post('http://localhost:4000/register/add', form);
      notify('🦄 Successfully registered!', 'success');
      navigate('/login');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      notify('Sorry, registration failed. Please try again.', 'error');
    }
  };

  return (
    <MDBContainer
      className="py-5 h-100"
      onSubmit={handleSubmit}
     
    >
       <MDBCard>
  <MDBRow className='g-0'>
  

    <MDBCol md='6'>
      <MDBCardImage src='https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700977529.jpg' alt="login form" className='rounded-start w-100' style={ {backgroundSize: 'cover',backgroundposition: 'center'} } />
    </MDBCol>

    <MDBCol md='6'><div className='d-flex flex-row mt-2'>
          
          <span className="h1 fw-bold mb-0">Register</span>
        </div>
      <MDBCardBody className='d-flex flex-column'>


 <form>
              
                  <MDBInput
                    label='First name'
                    id='firstName'
                    name='firstName'
                    type='text'
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
              
               
                  <MDBInput
                    label='Last name'
                    id='lastName'
                    name='lastName'
                    type='text'
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
               
              
               
                  <MDBInput
                    label='Date of birth'
                    id='birthday'
                    name='birthday'
                    type='date'
                    required
                    value={formData.birthday}
                    onChange={handleInputChange}
                  />
               
                
                  <MDBRadio
                    name='gender'
                    id='Female'
                    value='female'
                    label='Female'
                    inline
                    onChange={handleInputChange}
                    style={{ color: 'white' }}
                  />
                  <MDBRadio
                    name='gender'
                    id='male'
                    value='male'
                    label='Male'
                    inline
                    onChange={handleInputChange}
                    style={{ color: 'white' }}
                  />
                
             
                  <MDBInput
                    label='Email address'
                    id='email'
                    name='email'
                    type='email'
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
               
              
                  <MDBInput
                    label='Password'
                    id='password'
                    name='password'
                    type='password'
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
               
             
                  <MDBInput
                    label='National ID Card number'
                    id='nic'
                    name='nic'
                    type='text'
                    required
                    value={formData.nic}
                    onChange={handleInputChange}
                  />
                
                  <MDBInput
                    label='Phone number'
                    id='phoneNumber'
                    name='phoneNumber'
                    type='text'
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
              
             
               
                  <MDBFile
                    label='Upload a photo of your NIC'
                    id='file'
                    name='file'
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                
              <MDBBtn  className="mb-4 px-5" color='dark' size='lg' type='submit'>Register</MDBBtn>
             
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                If you have an account,{' '}
                <a href="/login" style={{ color: '#393f81' }}>Login here</a>
              </p>
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </form>
          </MDBCardBody>
          </MDBCol>
       </MDBRow>
      
      </MDBCard>
      
   
      <ToastContainer />
   </MDBContainer>
   
  );
};

export default Register;
