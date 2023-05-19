import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function MyProfile() {
  const [staticModal, setStaticModal] = useState(false);

  const toggleShow = () => setStaticModal(!staticModal);

  const handleDelete = () => { 
    axios.delete('/api/user')
      .then(response => {
        console.log(response);
        toggleShow();
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <MDBBtn className="mb-4 px-5" color='red' size='lg' onClick={toggleShow}>Delete</MDBBtn>

      <MDBModal staticBackdrop tabIndex='-1' show={staticModal} setShow={setStaticModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>What Are You Doing😢.Are shure About this</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                No
              </MDBBtn>
              <MDBBtn onClick={handleDelete}>Yes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
