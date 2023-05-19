import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle } from "react-icons/fi";
import axios from 'axios';
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
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Alert from 'react-bootstrap/Alert';
const states = [  "Central Province", "Eastern Province", "Northern Province", "North Central Province", "North Western Province", "Sabaragamuwa Province",  "Southern Province", "Uva Province", "Western Province"];


function Addissue() {
  const navigate = useNavigate();
  const [issueHeader, setIssueHeader] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [agentsName, setAgentName] = useState("");
  const [agentsAddress, setAgentAddress] = useState("");
  const [agentsPhone, setAgentPhone] = useState("");
  const [letter, setLetter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('issueHeader', issueHeader);
    formData.append('streetAddress', streetAddress);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('zipCode', zipCode);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('agentsName', agentsName);
    formData.append('agentsAddress', agentsAddress);
    formData.append('agentsPhone', agentsPhone);
    formData.append('letter', letter);
    
  
    if (
      issueHeader &&
      streetAddress &&
      city &&
      state &&
      zipCode &&
      description &&
      image &&
      agentsName &&
      agentsAddress &&
      agentsPhone &&
      letter
    ) {
      try {
        await axios.post('http://localhost:4000/issue/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
        notify();

        navigate(-1);
      } catch (error) {
        console.log(error);
        notify1();
      }
    } else {
      let errorMessage = "Please fill in all required fields.";
      if (!image) {
        errorMessage += " Image file is required.";
      }
      if (!letter) {
        errorMessage += " Letter file is required.";
      }
      alert(errorMessage);
      notify1();
    }
  };
  
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const isValidZipCode = (zip) => {
    const regex = /^\d{5}(?:[-\s]\d{4})?$/;
    return regex.test(zip);
  };

  const handleLetterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLetter(file);
    }
  };
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

  return (
    <MDBContainer fluid onSubmit={handleSubmit} methos='post'>
    
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='9' className='my-5'>
          <h1 className="text-black mb-4">What Is Your Issue?</h1>
          <MDBCard>
            <MDBCardBody className='px-4'>
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Issue Title</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Issue Header' size='lg' id='issueHeader' type='text' 
                    value={issueHeader}
                    onChange={(e) => setIssueHeader(e.target.value)}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                  <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Stree Address</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='No-20/2 Malabe Road' size='lg' id='streetAddress' type='text'
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">City</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Malabe' size='lg' id='city' type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">State</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <div className="align-items-center pt-4 pb-3">
                    <label htmlFor="state"></label>
                    <select
                      className="form-control"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    >
                      <option value="">Select a state</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Zip/Postal Code</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='105980' size='lg' id='zipCode' type='text'
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    onBlur={(e) => {
                      if (!isValidZipCode(e.target.value)) {
                        alert("Please enter a valid zip code.");
                      }
                    }}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Description</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBTextArea label='Description' id='description' rows={3} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </MDBCol>
             </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Upload A Related file</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBFile size='lg' id='image' 
                  className="image"
                  type='file'
                    onChange={handleFileUpload}
                    required
                  />
                  <div className="small text-muted mt-2">Upload a Related file. Max file size 50 MB</div>
                </MDBCol>
              </MDBRow>
              
              <br></br>
              
              <br></br>
              {[
        
        'warning',
       
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
         <FiAlertTriangle/>  Attention!!! ----- To Submit Your Issue You Need to get Permission with your State Ministry
        </Alert>
      ))}
              
              <br></br>
              
             
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Name of State Ministry</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='H.D.N.T.Ranaveera' size='lg' id='AgentName' type='text'
                    value={agentsName}
                    onChange={(e) => setAgentName(e.target.value)}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">State Division</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='Werahara South' size='lg' id='AgentAssress' type='text'
                    value={agentsAddress}
                    onChange={(e) => setAgentAddress(e.target.value)}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Phone Number</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBInput label='0112 xxx xxx' size='lg' id='AgentPhone' type='text'
                    value={agentsPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Upload The Letter</h6>
                </MDBCol>
                <MDBCol md='9' className='pe-5'>
                  <MDBFile size='lg' id='letter' 
                  type ='file'
                  className="letter"
                  onChange={handleLetterUpload}
                  required
                  />
                  <div className="small text-muted mt-2">Upload the Signatured Letter. Max file size 50 MB</div>
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <div>
              <MDBBtn className="btn btn-success" color='dark' type="submit" onClick={handleSubmit} >Post Issue</MDBBtn>
              <ToastContainer />
              </div>  
            </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
 
</MDBContainer>

);
}
export default Addissue;


