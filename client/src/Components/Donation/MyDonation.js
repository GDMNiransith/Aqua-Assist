import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../Navigation/Sidebar';
import { BiSearchAlt2 } from 'react-icons/bi';

const MyDonation = () => {
  const [donation, setDonation] = useState([]);
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
    toast.success('🦄 Successfull', {
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
    loadDonation();
  }, []);

  const loadDonation = async () => {
    try {
      const result = await axios.get('http://localhost:4000/donation/');
      setDonation(result.data);
    } catch (error) {
      console.log(error);
      notify();
    }
  };

  const deleteDonation = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/donation/${id}`);
      const { data } = response;
      if (response.status === 200) {
        loadDonation();
        alert('Delete successful!');
      } else {
        console.log(data); // Log the response data in case of non-200 status
        notify();
      }
    } catch (error) {
      console.log(error); // Log any error that occurred during the request
      notify();
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const title = 'Donations';
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, 'center');
    doc.setTextColor(0);
    doc.setFontSize(12);

    doc.setFontSize(8);
    doc.text(`*This Report is automatically generated.`, 20, 35, null, null);

    const headers = [
      ['Index', 'Issue Name', 'Full Name', 'NIC', 'Gender', 'Email', 'Phone Number', 'Bank', 'Branch', 'Amount', 'Payment Slip', 'Created At'],
    ];

    const data = donation.map((donate, index) => [
      index + 1,
      donate.issuename,
      donate.fullname,
      donate.nic,
   
      donate.email,
      donate.phoneNumber,
      donate.bank,
      donate.branch,
      donate.amount,
      
    ]);

    let contents = {
      startY: 20,
      head: headers,
      body: data,
    };

    // Generate table
    doc.autoTable(contents);

    // Save the PDF
    doc.save('DonationReport.pdf');
    notify1();
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>

      <h1>Your Donations 🙌</h1>

      <h6>View and edit past and future Donations</h6>

      <br></br>

      <div className="input-group rounded" style={{ height: 40, width: '30%' }}>
        <input
          type="text"
          placeholder="Search .....'Issue Name' "
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
            <th scope="col">Issue Name</th>
            <th scope="col">Full Name</th>
            <th scope="col">NIC</th>
           
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Bank</th>
            <th scope="col">Branch</th>
            <th scope="col">Amount</th>
            
          </tr>
        </thead>

        <tbody>
          {donation
            .filter((donate) => {
              if (search === '') {
                return donate;
              } else if (donate.issuename.toString().toLowerCase().includes(search.toString().toLowerCase())) {
                return donate;
              }
            })
            .map((donate, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{donate.issuename}</td>
                <td>{donate.fullname}</td>
                <td>{donate.nic}</td>
                
                <td>{donate.email}</td>
                <td>{donate.phoneNumber}</td>
                <td>{donate.bank}</td>
                <td>{donate.branch}</td>
                <td>{donate.amount}</td>
              
                <td>
                  <Link to={`/donation/update/${donate._id}`}>
                    <button className="btn btn-outline-warning" style={{ height: 30, width: 74 }}>
                      <i className="fa fa-thin fa-pen-to-square"></i>&nbsp;Edit
                    </button>
                  </Link>
                </td>

                <td>
                  <Link to="" onClick={() => deleteDonation(donate._id)}>
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

export default MyDonation;