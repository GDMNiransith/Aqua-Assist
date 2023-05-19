import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Sidebar from '../Navigation/Sidebar';

function Issue() {
  const [issue, setIssue] = useState([]);

  useEffect(() => {
    loadIssue();
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

  return (
    <div className="container">
      <div>
        <br></br><br></br>
        {issue.map((i) => (
          <Card style={{ width: '70rem' }}>
            <Card.Img variant="top" src={`http://127.0.0.1:8773/Project/aqua%20v3/server/IssueImages/${i.image}`} />
            <Card.Body>
              <Card.Title>{i.issueHeader}</Card.Title>
              <Card.Text>
                Location: {i.streetAddress} {i.city} {i.state}  Zip :{i.zipCode} 
              </Card.Text>
              <Card.Text>{i.description}</Card.Text>
              <Button variant="warning">
                <a
                  href="/addDonation"
                  style={{
                    textDecoration: 'none',
                    height: 50,
                    width: '30%',
                    color: 'white',
                  }}
                >
                  Donations
                </a>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Sidebar />
    </div>
  );
}

export default Issue;
