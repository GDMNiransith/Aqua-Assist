import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaHandHoldingUsd, FaHandHoldingWater, FaHandHolding } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Dropdown from 'react-bootstrap/Dropdown';

function CoolNavbar() {

  const loggedIn = localStorage.getItem('user');
  const navigate = useNavigate();

  const logOut =()=>{
    localStorage.clear();
    navigate('/login')
  }
  return (
    <Navbar className="custom-navbar" expand="lg" style={{ background: '#e4f0f6' }}>
      <Container>
        <Navbar.Brand as={Link} to="/Aboutus" className="navbar-brand">
          Aqua-Assist
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {loggedIn ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                 My Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/myissue"> <FaHandHoldingWater style={{ width: '1.75em' }}/>My Issue</Dropdown.Item>
                  <Dropdown.Item href="/myCampaign"> <FaHandHolding style={{ width: '1.75em' }}/>My Campaign</Dropdown.Item>
                  <Dropdown.Item href="/mydonation"> <FaHandHoldingUsd style={{ width: '1.75em' }}/>My Donation</Dropdown.Item>
                  <Dropdown.Item href="/myprofile"> <FaUserAlt style={{ width: '1.75em' }}/> My Profile</Dropdown.Item>
                  <Dropdown.Item> <hr className="dropdown-divider" /></Dropdown.Item>
                  <Dropdown.Item onClick={logOut}to="/login">  <BiLogOut style={{ width: '1.75em' }}/> Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CoolNavbar;
