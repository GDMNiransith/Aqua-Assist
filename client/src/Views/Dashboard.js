import React from 'react'
import About from '../Views/About';
import Contactus from '../Views/Contactus';
import Fotter from '../Navigation/Footter';
import './Dashboard.css'
import { NavLink } from 'react-router-dom';
import { FaHandshake } from "react-icons/fa";
const Dashboard = () => {
  return (
    <div>
        <section id="Start">
            <div className='container '>
                <div className='row justify-content-center'>
                    <div className='col-md-8 mt-5'>
                    <h1 className='display-4 fw-bolder mb-4 text-center text-white'>Join With Us!! Help Those Are Who Need</h1>
                    <p className='lead text-center fs-4 mb-5 text-white'>One of the main water issues in Sri Lanka is water scarcity, particularly in the dry zone, which covers two-thirds of the country. This is primarily due to the uneven distribution of rainfall across the island, with the dry zone receiving considerably less rainfall than the wet zone.
                    nadequate water infrastructure is another issue that hinders the equitable distribution of water resources in Sri Lanka.</p>
                    <div className='buttons'>
                       <NavLink to="/login" className="btn btn-outline-primary px-4 rounded-pill">   GET START  <FaHandshake/></NavLink>  
                    </div>
                    </div>
                </div>
            </div>
        </section>
        <About/>
       
        <Fotter/>

    </div>
  );
}

export default Dashboard;