import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import Sidebar from '../../Navigation/AdminSidebar';

const UserVerification = () => {
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
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    const result = await axios.get('http://localhost:4000/issue/');
    setIssues(result.data);
  };

  const deleteIssue = async (id) => {
    const response = await axios.delete(`http://localhost:4000/issue/${id}`);
    if (response.status === 200) {
      loadIssues();
      alert('Delete successful!');
    } else {
      console.log(response.data);
      notify1();
    }
  };

  const openFileLink = (letter) => {
    const url = `http://127.0.0.1:8773/Project/aqua%20v3/server/IssueImages/${letter}`;
    window.open(url, '_blank');
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

    const headers = [['Index', 'Issue Header', 'Agents Name', 'Letter']];

    const data = issues.map((issue, index) => [
      index + 1,
      issue.issueHeader,
      issue.agentsName,
      issue.letter,
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

      <h1>User Issues 🤞</h1>

      <h6>Use the Administrator carefully</h6>

      <br></br>

      <div className="input-group rounded" style={{ height: 40, width: '30%' }}>
        <input
          type="text"
          placeholder="Search by Issue Header"
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
            <th scope="col">Issue Header</th>
            <th scope="col">Agents Name</th>
            <th scope="col">Letter</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {issues
            .filter((issue) => {
              if (search === '') {
                return issue;
              } else if (issue.issueHeader.toString().toLowerCase().includes(search.toString().toLowerCase())) {
                return issue;
              }
            })
            .map((issue, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{issue.issueHeader}</td>
                <td>{issue.agentsName}</td>
                <td>
                  <button className="btn btn-link" onClick={() => openFileLink(issue.letter)}>
                    {issue.letter}
                  </button>
                </td>
                <td>
                  <Link to="" onClick={() => deleteIssue(issue._id)}>
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

export default UserVerification;
