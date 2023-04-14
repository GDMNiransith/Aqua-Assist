import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import MyProfile from './Components/MyProfile';
import MyIssue from './Components/Issue/MyIssue';
import AddIssue from './Components/Issue/Addissue';
import Issue from './Components/Issue';
import MyCampaign from './Components/Campaign/MyCapaign';
import AddCampaign from './Components/Campaign/AddCampaign';
import MyDonation from './Components/Donation/MyDonation';
import AddDonation from './Components/Donation/AddDonation';
import ForgotPassword from './Components/ForgotPassword';
import AddNextCampaign from './Components/Campaign/AddNextCampaign';
import AddInventory from './Components/Campaign/AddInventory';
import AdminDashboard from './Components/Administrator/AdminDashboard';
import VerifyUser from './Components/Administrator/VerifyUser';
import AdminLogin from './Components/Administrator/AdminLogin';
import Campaign from './Components/Campaign';
import VerifyIssue from './Components/Administrator/VerifyIssue';
import EditProfile from './Components/Editprofile'
import EditIssue from './Components/Issue/EditIssue';
import EditDonation from './Components/Donation/UpdateDonation';
import EditCampaign from './Components/Campaign/UpdateCampaign';
// Views
import AboutUs from './Views/About';
import Dashboard from './Views/Dashboard';


// Navigation
import Navbar from './Navigation/Navbar';
import Footer from './Navigation/Footter';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem('user');
  console.log('user', token);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:4000/register/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        setLoggedIn(true);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div>
        {/* Render the Navbar component and pass the loggedIn prop */}
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      </div>
      <Routes>
        
        <Route path="/footer" element={<Footer />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {loggedIn && (
          <>
           
                       
                      </>
                    )}
            
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/addIssue" element={<AddIssue />} />
            <Route path="/myCampaign" element={<MyCampaign />} />
            <Route path="/addCampaign" element={<AddCampaign />} />
            <Route path="/addNextCampaign" element={<AddNextCampaign />} />
            <Route path="/addInventory" element={<AddInventory />} />
            <Route path="/issue" element={<Issue />} />
            <Route path="/myIssue" element={<MyIssue />} />
            <Route path="/myDonation" element={<MyDonation />} />
            <Route path="/addDonation" element={<AddDonation />} />
            <Route path="/issue/update/:id" element={<EditIssue/>} />
            <Route path="/donation/update/:id" element={<EditDonation/>} />
            <Route path="/register/update/:id" element={<EditProfile/>} />
            <Route path="/campaign/update/:id" element={<EditCampaign />} />
            <Route path="/campaign" element={<Campaign />} />
            

                   

                    <Route path="/verifyUser" element={<VerifyUser />} />
                    <Route path="/adminLogin" element={<AdminLogin />} />
                    <Route path="/adminDashboard" element={<AdminDashboard />}/>
                       
                   <Route path="/verifyIssue" element={<VerifyIssue />} />
                  </Routes>
                </BrowserRouter>
              );
            }
            
            export default App;
            
