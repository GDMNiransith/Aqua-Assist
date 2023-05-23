import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { MdMargin } from 'react-icons/md';
import Sidebar from '../Navigation/Sidebar';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UncontrolledExample() {
  const [issue, setIssue] = useState([]);
  const [campaign, setCampaign] = useState([]);

  useEffect(() => {
    loadIssue();
    loadCampaign();
  }, []);

  const loadIssue = async () => {
    try {
      const result = await axios.get('http://localhost:4000/issue/');
      setIssue(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCampaign = async () => {
    try {
      const result = await axios.get('http://localhost:4000/campaign/');
      setCampaign(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container" >
    <Carousel>
      <Carousel.Item >
      <Image src="https://th.bing.com/th/id/R.381e7db206381923acc686d2c2c2b87e?rik=ktqD009IIgR%2fnw&pid=ImgRaw&r=0" 
      fluid 
      alt="First slide"
      />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://wallpaperaccess.com/full/3350643.jpg"
          fluid
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://th.bing.com/th/id/R.da66917fb998db7ca859dc24a7f56d90?rik=Py28WR4ZV8m7rA&riu=http%3a%2f%2fwallpaperswide.com%2fdownload%2fmountains_on_the_way_to_glenorchy-wallpaper-5120x1600.jpg&ehk=rYjOLUqMTrqttYiWVNTrYaQe1VNROkuX70kq0IgMTrs%3d&risl=&pid=ImgRaw&r=0"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Sidebar/>

    
    <br></br>
   { issue.map (i=>(
    <Card style={{ width: '20rem' }}>
    <Card.Img variant="top"  src={i.image} />
    
    <Card.Body>
      <Card.Title>{i.issueHeader}</Card.Title>
      <Card.Text>
      Location : {i.streetAddress} {i.city} {i.state}
      </Card.Text>
      
      <Button variant="warning" > <a href='/addDonation'  style={{ textDecoration: 'none', height: 50, width: '30%', color: 'white' }}> Donations </a></Button>
    </Card.Body>
  </Card>
    
   ))
   }
    <div style={{alignItems: 'right' }} >
        <br></br><br></br>
        {campaign.map((c) => (
          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={c.notice} />
            <Card.Body>
              <Card.Title>{c.campaignName}</Card.Title>
              <Card.Text>
                Date: {c.date}  
              </Card.Text>
              <Card.Text>
                Time: {c.time}  
              </Card.Text>
              <Card.Text>location : {c.location}</Card.Text>
              <Card.Text>Organizer : {c.organizerName}</Card.Text>
              <Card.Text>Cantact : {c.contactNumber}</Card.Text>
              
            </Card.Body>
          </Card>
         
        ))}
      </div>



    
    </div>







  );
}

export default UncontrolledExample;




