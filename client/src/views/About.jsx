import React from 'react';
import './About.css'
const About = () => {
  return (
    <div>
        <section id="about">
            <div className='container my-5 py-5'>
                <div className="row">
                    <div className="col-md-6">
                        <img src='https://th.bing.com/th/id/R.22fdedd422e9a1630e2214db359ef458?rik=RrfrAlKg8Y76ww&pid=ImgRaw&r=0' alt="About"
                        className='w-75 mt-5'/>
                        <img src='https://scienceinfo.net/data-images/images/lack-of-clean-water-humans-may-have-to-drink-toilet-water-in-the-future-picture-4-F70Ket7XH.jpg' alt="About"
                        className='w-75 mt-5'/>
                    </div>
                    <div className='col-md-6'>
                    <h3 className='fs-5'>About Us</h3>
                    <h1 className='display-6'>Who <b>We </b>Are </h1>
                    <hr/>
                    <p className='lead mb-4'>Sri Lanka also faces significant water pollution problems, which affect both surface and groundwater resources. Agricultural activities are a major source of water pollution, as the excessive use of fertilizers and pesticides contaminates water sources.</p>
                    <p className='lead mb-4'>To address the water problems in Sri Lanka, adopting an Integrated Water Resources Management (IWRM) approach is crucial. IWRM involves the coordinated management of water, land, and related resources to maximize economic and social welfare without compromising the sustainability of vital ecosystems. </p>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default About;
