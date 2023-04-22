import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { FaFacebookSquare ,FaTwitter,FaLinkedinIn} from "react-icons/fa";
import { AiOutlineGoogle,AiOutlineInstagram,AiFillGithub } from "react-icons/ai";
function Fotter() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <FaFacebookSquare/>
          </a>
          <a href='' className='me-4 text-reset'>
            <FaTwitter />
          </a>
          <a href='' className='me-4 text-reset'>
            <AiOutlineGoogle />
          </a>
          <a href='' className='me-4 text-reset'>
            <AiOutlineInstagram />
          </a>
          <a href='' className='me-4 text-reset'>
            <FaLinkedinIn />
          </a>
          <a href='' className='me-4 text-reset'>
            <AiFillGithub />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                Company name
              </h6>
              <p>
              We are a group of SLIIT students in our third year, currently studying the ITPM module. Our group is identified as number 82.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Team Members</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Munasinghe S D
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Gamage A G R U
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Ramaweera H D N T
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Niransith G D M
                </a>
              </p>
            </MDBCol>

          

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                SLIIT, Malabe
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                aquaassist@outlook.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 9470 231 0660
              </p>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © Admin Login here:
        <a className='text-reset fw-bold' href='/adminlogin'>
          AquaAssist.lk
        </a>
      </div>
    </MDBFooter>
  );
}
export default Fotter;