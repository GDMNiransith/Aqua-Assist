import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFile,
  MDBRadio
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const MyDonation = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    issuename: '',
    fullname: '',
    nic: '',
    email: '',
    phoneNumber: '',
    bank: '',
    branch: '',
    amount: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('issuename', formData.issuename);
    form.append('fullname', formData.fullname);
    form.append('nic', formData.nic);
    form.append('email', formData.email);
    form.append('phoneNumber', formData.phoneNumber);
    form.append('bank', formData.bank);
    form.append('branch', formData.branch);
    form.append('amount', formData.amount);
    // Append the file here
    const fileInput = document.getElementById('LetterFile');
    if (fileInput.files.length > 0) {
      form.append('paymentSlip', fileInput.files[0]);
    }

    // Perform API request or form submission using axios
    axios
      .post('http://localhost:4000/donation/add', form)
      .then((response) => {
        
        notify();
        Navigate(-1);
      })
      .catch((error) => {
        console.log(error)
        notify1();
      });
  };

  const notify1 = () =>
    toast.error('😥try Again!! ', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const notify = () =>
    toast.success('🦄 SuccessFull', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  return (
    <div>
      <MDBContainer fluid onSubmit={handleSubmit} method="post">
        <MDBRow className="justify-content-center align-items-center m-5">
          <MDBCard>
            <MDBCardBody className="px-4">
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Payment portal 😎</h3>
             
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Issu Name"
                      size="lg"
                      id="issuename"
                      type="text"
                      value={formData.issuename}
                      onChange={handleChange}
                      required
                    />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Full Name"
                      size="lg"
                      id="fullname"
                      type="text"
                      value={formData.fullnam}
                      onChange={handleChange}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="NIC Number"
                      size="lg"
                      id="nic"
                      type="text"
                      value={formData.nic}
                      onChange={handleChange}
                      required
                    />
                    {errors.nic && <div className="text-danger">{errors.nic}</div>}
                  </MDBCol>
                  <MDBCol md="6" className="mb-4">
                    <MDBRadio
                      name="inlineRadio"
                      id="inlineRadio1"
                      value="option1"
                      label="Female"
                      inline
                      onChange={handleChange}
                    />
                    <MDBRadio
                      name="inlineRadio"
                      id="inlineRadio2"
                      value="option2"
                      label="Male"
                      inline
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email"
                      size="lg"
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Phone Number"
                      size="lg"
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                    {errors.phoneNumber && (
                      <div className="text-danger">{errors.phoneNumber}</div>
                    )}
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <hr className="mx-n3" />
                  <br></br> <br></br>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Bank"
                      size="lg"
                      id="bank"
                      type="text"
                      value={formData.bank}
                      onChange={handleChange}
                      required
                    />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Branch"
                      size="lg"
                      id="branch"
                      type="text"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Amount"
                      size="lg"
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Upload The Payment Slip</h6>
                  </MDBCol>
                  <MDBCol md="9" className="pe-5">
                    <MDBFile size="lg" id="LetterFile" onChange={handleChange} required />
                    <div className="small text-muted mt-2">Upload Your Payment Slip. Max file size 10 MB</div>
                  </MDBCol>
                </MDBRow>
                <hr className="mx-n3" />
                <MDBBtn color="success" size="lg" onClick={handleSubmit}
                >
                  Submit
                </MDBBtn>
             
              <ToastContainer />
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default MyDonation;


