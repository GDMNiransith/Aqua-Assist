import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../Navigation/AdminSidebar';
import { BiSearchAlt2 } from 'react-icons/bi';

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
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:4000/register/users/');
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/register/users/${id}`);
      const { data } = response;
      if (response.status === 200) {
        loadUsers();
        alert('Delete successful!');
      } else {
        console.log(data);
        notify1();
      }
    } catch (error) {
      console.log(error);
      notify1();
    }
  };

  const openFileLink = (fileName) => {
    const url = `http://127.0.0.1:8773/Project/aqua%20v3/server/Uploads/${fileName}`;
    window.open(url, '_blank');
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const title = 'Users';
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, 'center');
    doc.setTextColor(0);
    doc.setFontSize(12);

    doc.setFontSize(8);
    doc.text(`*This Report is automatically generated.`, 20, 35, null, null);

    const headers = [['Index', 'First Name', 'Last Name', 'Birthday', 'Gender', 'Email', 'NIC', 'Phone Number', 'File']];

    const data = users.map((user, index) => [
      index + 1,
      user.firstName,
      user.lastName,
      user.birthday,
      user.gender,
      user.email,
      user.nic,
      user.phoneNumber,
      user.file,
    ]);

    let contents = {
      startY: 20,
      head: headers,
      body: data,
    };
    doc.autoTable(contents);
    doc.save('UserReport.pdf');
    notify1();
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>

      <h1>Registered Users 🤞</h1>

      <h6>Use the Administrator carefully</h6>

      <br></br>

      <div className="input-group rounded" style={{ height: 40, width: '30%' }}>
        <input
          type="text"
          placeholder="Search by User Name"
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
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Birthday</th>
            <th scope="col">Gender</th>
            <th scope="col">Email</th>
            <th scope="col">NIC</th>
            <th scope="col">Phone Number</th>
            <th scope="col">File</th>
            <th scope="col">Actions</th> {/* New column for delete button */}
          </tr>
        </thead>

        <tbody>
          {users
            .filter((user) => {
              if (search === '') {
                return user;
              } else if (user.firstName.toString().toLowerCase().includes(search.toString().toLowerCase())) {
                return user;
              }
            })
            .map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.birthday}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.nic}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button className="btn btn-link" onClick={() => openFileLink(user.file)}>
                    {user.file}
                  </button>
                </td>
                <td>
                  <Link to="" onClick={() => deleteUser(user._id)}>
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