import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../Navigation/Sidebar';
import { BiSearchAlt2 } from 'react-icons/bi';

const MyCampaign = () => {
  const [campaign, setCampaign] = useState([]);
  const [search, setSearch] = useState('');
  const notify = () =>
    toast.error('Sorry Try Again😥', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  const notify1 = () =>
    toast.success('🦄 Successful', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      const result = await axios.get('http://localhost:4000/campaign/');
      setCampaign(result.data);
    } catch (error) {
      console.log(error);
      notify();
    }
  };

  const deleteCampaign = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/campaign/${id}`);
      const { data } = response;
      if (response.status === 200) {
        loadCampaign();
        alert('Delete successful!');
      } else {
        console.log(data);
        notify();
      }
    } catch (error) {
      console.log(error);
      notify();
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const title = 'Campaigns';
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, 'center');
    doc.setTextColor(0);
    doc.setFontSize(12);

    doc.setFontSize(8);
    doc.text(`*This Report is automatically generated.`, 20, 35, null, null);

    const headers = [['Index', 'CampaignName', 'Time', 'Date', 'Location', 'OrganizerName', 'ContactNumber']];

    const data = campaign.map((camp, index) => [
      index + 1,
      camp.campaignName,
      camp.time,
      camp.date,
      camp.location,
      camp.organizerName,
      camp.contactNumber,
    ]);

    let contents = {
      startY: 20,
      head: headers,
      body: data,
    };

    // Generate table
    doc.autoTable(contents);

    // Save the PDF
    doc.save('CampaignReport.pdf');
    notify1();
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>

      <h1>Your Campaigns 🙌</h1>

      <h6>View and edit past and future Campaigns</h6>

      <br></br>

      <div className="input-group rounded" style={{ height: 40, width: '30%' }}>
        <input
          type="text"
          placeholder="Search Campaign Name"
          className="mr-2"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <table className="table table-striped" style={{ fontSize: '80%' }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Campaign Name</th>
            <th scope="col">Time</th>
            <th scope="col">Date</th>
            <th scope="col">Location</th>
            <th scope="col">Organizer Name</th>
            <th scope="col">Contact Number</th>
          </tr>
        </thead>

        <tbody>
          {campaign
            .filter((camp) => {
              if (search === '') {
                return camp;
              } else if (camp.campaignName.toString().toLowerCase().includes(search.toString().toLowerCase())) {
                return camp;
              }
            })
            .map((camp, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{camp.campaignName}</td>
                <td>{camp.time}</td>
                <td>{camp.date}</td>
                <td>{camp.location}</td>
                <td>{camp.organizerName}</td>
                <td>{camp.contactNumber}</td>

                <td>
                  <Link to={`/campaign/update/${camp._id}`}>
                    <button className="btn btn-outline-warning" style={{ height: 30, width: 74 }}>
                      <i className="fa fa-thin fa-pen-to-square"></i>&nbsp;Edit
                    </button>
                  </Link>
                </td>

                <td>
                  <Link to="" onClick={() => deleteCampaign(camp._id)}>
                    <a className="btn btn-outline-danger" href="#" style={{ height: 30, width: 90 }}>
                      <i className="fa fa-thin fa-trash" style={{ height: 2, width: 12 }}></i>&nbsp;Delete
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br></br>
      <Sidebar />
      <div>
        <button className="btn btn-success">
          <a href="/addCampaign" style={{ textDecoration: 'none', height: 50, width: '30%', color: 'white' }}>
            Add Campaign
          </a>
        </button>
        <ToastContainer />
      </div>

      <br></br>
      <br></br>
      <button className="btn btn-primary" onClick={() => generateReport()} style={{ height: 50, width: '30%' }}>
        Download PDF
      </button>
    </div>
  );
};

export default MyCampaign;