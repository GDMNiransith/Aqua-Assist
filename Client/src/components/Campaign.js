import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Sidebar from '../Navigation/Sidebar';

function Issue() {
  const [campaign, setIssue] = useState([]);

  useEffect(() => {
    loadIssue();
  }, []);

  const loadIssue = async () => {
    try {
      const result = await axios.get('http://localhost:4000/campaign/');
      setIssue(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div>
        <br></br><br></br>
        {campaign.map((c) => (
          <Card style={{ width: '50rem' }}>
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
              <Card.Text> {c.description}</Card.Text>
              <Card.Text> requirements:  {c.requirements}</Card.Text>
              <Card.Text>Organizer : {c.organizerName}</Card.Text>
              <Card.Text>Cantact : {c.contactNumber}</Card.Text>
              
            </Card.Body>
          </Card>
         
        ))}
      </div>
      
      <Sidebar />
    </div>
  );
}

export default Issue;
