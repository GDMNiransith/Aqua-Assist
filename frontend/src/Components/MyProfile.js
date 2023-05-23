import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Sidebar from '../Navigation/Sidebar';
import './Myprofile.css';
import Button from 'react-bootstrap/Button';
import { MdMargin } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstname: '',
    phoneNumber: '',
    nic: ''
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const token = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log(token.substr(1, token.length - 2));
        const t = token.substr(1, token.length - 2);
        const response = await axios.get('http://localhost:4000/register/profile', {
          headers: {
            Authorization: `Bearer ${t}`
          }
        });

        const { email, password, firstname, phoneNumber, nic, _id } = response.data;
        setUser({ email, password, firstname, phoneNumber, nic, _id });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  const { email, password, firstname, phoneNumber, nic } = user;

  const deleteUser = async (id) => {
    console.log(token);
    try {
      const t = token.substr(1, token.length - 2);
      setIsDeleting(true);
      const response = await axios.delete(`http://localhost:4000/register/${id}`, {
        headers: {
          Authorization: `Bearer ${t}`
        }
      });
      notify();
      navigate('/login')
     

      console.log(response.data);
    } catch (error) {
      notify1();
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const notify1 = () =>
    toast.error('😥try Again!!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
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
      theme: 'dark'
    });

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="my-5"
                    style={{ width: '80px' }}
                    fluid
                  />
                  <MDBTypography tag="h5">{firstname}</MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone number</MDBTypography>
                        <MDBCardText className="text-muted">{phoneNumber}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Security</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Password</MDBTypography>
                        <MDBCardText className="text-muted">*********</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">NIC Number</MDBTypography>
                        <MDBCardText className="text-muted">{nic}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="12" className="text-center">
                        <Link to={`/register/update/${user._id}`}>
                          <button className="btn btn-warning" style={{ height: 30, width: 74 }}>
                            <i className="fa fa-thin fa-pen-to-square"></i>&nbsp;Edit
                          </button>
                        </Link>
                        <MDBBtn color="danger" style={{ height: 30, width: 74 }} onClick={deleteUser}>
                          {isDeleting ? 'Deleting...' : <> Delete</>}
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer />
      <Sidebar />
    </section>
  );
};

export default MyProfile;
