import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile
} from 'mdb-react-ui-kit';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "rc-time-picker/assets/index.css";
import './AddCampaign.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from 'react-bootstrap/Alert';

const AddCampaign = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [campaignData, setCampaignData] = useState({
    name: '',
    time: '',
    date: null,
    location: '',
    description: '',
    organizerName: '',
    phoneNumber: '',
    email: ''
  });
  const [emailError, setEmailError] = useState('');
  const [WaterBottles, setWaterBottles] = useState(0);
  const [LunchPackets, setLunchPackets] = useState(0);
  const [Funding, setFunding] = useState(0);
  const [Metirials, setMetirials] = useState(0);
  const [CoolDrinks, setCoolDrinks] = useState(0);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setCampaignData(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const handleEmailChange = (event) => {
    const { value } = event.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? '' : 'Please enter a valid email address');
    setCampaignData(prevState => ({
      ...prevState,
      email: value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', campaignData.name);
    formData.append('time', campaignData.time);
    formData.append('date', campaignData.date);
    formData.append('location', campaignData.location);
    formData.append('description', campaignData.description);
    formData.append('organizerName', campaignData.organizerName);
    formData.append('phoneNumber', campaignData.phoneNumber);
    formData.append('email', campaignData.email);
    formData.append('WaterBottles', WaterBottles);
    formData.append('LunchPackets', LunchPackets);
    formData.append('Funding', Funding);
    formData.append('Metirials', Metirials);
    formData.append('CoolDrinks', CoolDrinks);

    axios.post('http://localhost:4000/campaigns/add', formData)
      .then(response => {
        console.log(response.data);
        notify();
        navigate('/addinventory');
      })
      .catch(error => {
        console.error(error);
        notify1();
      });
  }

  const notify1 = () => toast.error('😥 Try Again!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const notify = () => toast.success('🦄 Successful', {
    position: "bottom -right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "WaterBottles":
        setWaterBottles(value);
        break;
      case "LunchPackets":
        setLunchPackets(value);
        break;
      case "Funding":
        setFunding(value);
        break;
      case "Metirials":
        setMetirials(value);
        break;
      case "CoolDrinks":
        setCoolDrinks(value);
        break;
      default:
        break;
    }
  };

  return (
    
    <MDBContainer fluid  onSubmit={handleSubmit} methos='post' >
      
      
      
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
                  <MDBInput label='Campaign Name' size='lg' id='name' type='text' onChange={handleInputChange} />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Time Of the Campaign</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Mention the time' size='lg' id='time' type='text' onChange={handleInputChange} />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Date Of the Campaign</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <DatePicker
                    label='Mention a Date'
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
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
                  <MDBInput label="Organizer's Phone Number" size='lg' id='phoneNumber' type='text' onChange={handleInputChange} />
                </MDBCol>
               
              </MDBRow>
              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Email</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label="Organizer's Email" size='lg' id='email' type='email' onChange={handleEmailChange} />
                  {emailError && <div className="small text-danger">{emailError}</div>}
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />

              {['success'].map((variant) => (
                <Alert key={variant} variant={variant}>
                  -------------------------- What Kind of {variant} Equipment do you need For Your Campaign--------------------------
                </Alert>
              ))}

              <div className="form-group">
                <label htmlFor="WaterBottles">Water Bottles</label>
                <input
                  type="Number"
                  className="form-control"
                  name="WaterBottles"
                  placeholder="How many Water Bottles"
                  value={WaterBottles}
                  onChange={HandleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="LunchPackets">Lunch Packets</label>
                <input
                  type="Number"
                  className="form-control"
                  name="LunchPackets"
                  placeholder="How many Lunch Packets"
                  value={LunchPackets}
                  onChange={HandleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Funding">Funding</label>
                <input
                  type="Number"
                  className="form-control"
                  name="Funding"
                  placeholder="Enter Funding"
                  value={Funding}
                  onChange={HandleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Metirials">Materials</label>
                <input
                  type="Number"
                  className="form-control"
                  name="Metirials"
                  placeholder="Materials"
                  value={Metirials}
                  onChange={HandleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="CoolDrinks">Soft Drinks</label>
                <input
                  type="Number"
                  className="form-control"
                  name="CoolDrinks"
                  placeholder="How many Soft Drinks"
                  value={CoolDrinks}
                  onChange={HandleChange}
                />
              </div>


              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit'>Post</MDBBtn>
              <ToastContainer />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
   
    </MDBContainer>
    
  );
};

export default AddCampaign;



