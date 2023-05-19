import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function HomePage() {
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
    <div className="container">
      <Carousel>
        <Carousel.Item>
          <Image
            src="https://th.bing.com/th/id/R.381e7db206381923acc686d2c2c2b87e?rik=ktqD009IIgR%2fnw&pid=ImgRaw&r=0"
            fluid
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Clean Water for All</h3>
            <p>Essential for Health, Dignity, and Development!</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Add more carousel items here */}
      </Carousel>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ float: 'left' }}>
          <h1 style={{ color: 'blue', fontSize: '24px', fontWeight: 'bold' }}>Issue</h1>

          {issue.map((i) => (
            <Card key={i.id} style={{ width: '20rem' }}>
              <Card.Img
                variant="top"
                src={`http://127.0.0.1:8773/Project/aqua%20v3/server/IssueImages/${i.image}`}
              />
              <Card.Body>
                <Card.Title>{i.issueHeader}</Card.Title>
                <Card.Text>Location: {i.streetAddress} {i.city} {i.state}</Card.Text>
                <Button variant="warning">
                  <a href="/addDonation" style={{ textDecoration: 'none', color: 'white' }}>
                    Donations
                  </a>
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div style={{ float: 'right' }}>
          <h3 style={{ color: 'blue', fontSize: '24px', fontWeight: 'bold' }}>Campaign</h3>

          {campaign.map((c) => (
            <Card key={c.id} style={{ width: '20rem' }}>
              <Card.Img variant="top" src={c.Image} />
              <Card.Body>
                <Card.Title>{c.issueHeader}</Card.Title>
                <Card.Text>Location: {c.streetAddress} {c.city} {c.state}</Card.Text>
                <Card.Text>{c.description}</Card.Text>
                <Button variant="warning">
                  <a href="/addDonation" style={{ textDecoration: 'none', color: 'white' }}>
                    Donations
                  </a>
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
