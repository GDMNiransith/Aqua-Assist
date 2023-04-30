import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../Navigation/Sidebar';
import { BiSearchAlt2 } from 'react-icons/bi';

const MyIssue = () => {
  const [issue, setIssue] = useState([]);
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
    loadIssue();
  }, []);

  const loadIssue = async () => {
    try {
      const result = await axios.get('http://localhost:4000/issue/');
      setIssue(result.data);
    } catch (error) {
      console.log(error);
      notify();
    }
  };

  const deleteIssue = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/issue/${id}`);
      const { data } = response;
      if (response.status === 200) {
        loadIssue();
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
    const title = 'Issues';
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, 'center');
    doc.setTextColor(0);
    doc.setFontSize(12);

    doc.setFontSize(8);
    doc.text(`*This Report is automatically generated.`, 20, 35, null, null);

    const headers = [['Index', 'IssueHeader', 'StreetAddress', 'City', 'State', 'Zip']];

    const data = issue.map((reserve, index) => [
      index + 1,
      reserve.issueHeader,
      reserve.streetAddress,
      reserve.city,
      reserve.state,
      reserve.zipCode,
    ]);

    let contents = {
      startY: 20,
      head: headers,
      body: data,
    };

    doc.autoTable(contents);
    doc.save('IssueReport.pdf');
    notify1();
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>

      <h1>Your Issues 🙌</h1>

      <h6>View and edit past and future Issues</h6>

      <br></br>

      <div class="input-group rounded" style={{ height: 40, width: '30%' }}>
        <input
          type="text"
          placeholder="Search .....'Issue Header' "
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

      <table class="table table-striped" style={{ fontSize: '80%' }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">IssueHeader</th>
            <th scope="col">StreetAddress</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Zip</th>
          </tr>
        </thead>

        <tbody>
          {issue
            .filter((Issue) => {
              if (search === '') {
                return Issue;
              } else if (Issue.issueHeader.toString().toLowerCase().includes(search.toString().toLowerCase())) {
                return Issue;
              }
            })
            .map((Issue, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{Issue.issueHeader}</td>
                <td>{Issue.streetAddress}</td>
                <td>{Issue.city}</td>
                <td>{Issue.state}</td>
                <td>{Issue.zipCode}</td>

                <td>
                <Link to={`/issue/update/${Issue._id}`}>
  <button className="btn btn-outline-warning" style={{ height: 30, width: 74 }}>
    <i className="fa fa-thin fa-pen-to-square"></i>&nbsp;Edit
  </button>
</Link>

                </td>

                <td>
                  <Link to="" onClick={() => deleteIssue(Issue._id)}>
                    <a className="btn btn-outline-danger" href="#" style={{ height: 30, width: 90 }}>
                      <i class="fa fa-thin fa-trash" style={{ height: 2, width: 12 }}></i>&nbsp;Delete
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
          <a href="/addIssue" style={{ textDecoration: 'none', height: 50, width: '30%', color: 'white' }}>
            {' '}
            Add Issue
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

export default MyIssue;