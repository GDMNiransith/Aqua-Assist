import React, { useState } from "react";
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea
} from 'mdb-react-ui-kit';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import './AddCampaign.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router-dom";

const AddCampaign = () => {
  const Navigate = useNavigate();
  const [campaignData, setCampaignData] = useState({
    campaignName: '',
    time: '',
    date: null,
    location: '',
    description: '',
    requirements:'',
    poster: null,
    organizerName: '',
    contactNumber: '',
    email: ''
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setCampaignData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleDateChange = (date) => {
    setCampaignData((prevState) => ({ ...prevState, date }));
  };

  const handlePosterChange = (event) => {
    const file = event.target.files[0];
    setCampaignData((prevState) => ({ ...prevState, poster: file }));
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setCampaignData((prevState) => ({ ...prevState, email: value }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('campaignName', campaignData.campaignName);
      formData.append('time', campaignData.time);
      formData.append('date', campaignData.date);
      formData.append('location', campaignData.location);
      formData.append('description', campaignData.description);
      formData.append('requirements', campaignData.requirements);
      formData.append('poster', campaignData.poster);
      formData.append('organizerName', campaignData.organizerName);
      formData.append('contactNumber', campaignData.contactNumber);
      formData.append('email', campaignData.email);

      await axios.post('http://localhost:4000/campaign/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Navigate(-1);

     
    } catch (error) {
     
    }
  };

  const validateEmail = (email) => {
    // Email validation regex pattern
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const isEmailValid = validateEmail(campaignData.email);

  return (
   
    <MDBContainer fluid onSubmit={handleSubmit} methos='post'>
      
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='9' className='my-5'>
          <h1 class="text-black mb-4">Add Your Campaign 🤞</h1>
          <MDBCard>
            <MDBCardBody className='px-4'>
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Campaign Name</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Campaign Name' size='lg' id='campaignName' type='text' onChange={handleInputChange} />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Time Of the campaign</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Mention the time' size='lg' id='time' type='text' onChange={handleInputChange} />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Date Of the campaign</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <DatePicker
                    label='Mention a Date'
                    selected={campaignData.date}
                    onChange={handleDateChange}
                    dateFormat={"dd/MM/yyyy"}
                  />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Location</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Mention a location' size='lg' id='location' type='text' onChange={handleInputChange} />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Description</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBTextArea label='Write a description' id='description' rows={3} onChange={handleInputChange} />
                </MDBCol>
              </MDBRow>
             
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Requirements</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Mention a location' size='lg' id='requirements' type='text' onChange={handleInputChange} />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Upload a Poster</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Choose a poster' size='lg' id='poster' type='file' onChange={handlePosterChange} />
                  <div className="small text-muted mt   2">Create a Poster And Upload Here. Max file size 50 MB</div>
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Organizer's Name</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label="Organizer's Full Name" size='lg' id='organizerName' type='text' onChange={handleInputChange} />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Phone Number</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label="Organizer's Phone Number" size='lg' id='contactNumber' type='text' onChange={handleInputChange} />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Email</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput
                    label="Organizer's Email"
                    size='lg'
                    id='email'
                    type='email'
                    onChange={handleEmailChange}
                  
                  />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type="submit" onClick={handleSubmit} >
                Post
              </MDBBtn>
              <ToastContainer />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      
    </MDBContainer>
   
  );
};

export default AddCampaign;