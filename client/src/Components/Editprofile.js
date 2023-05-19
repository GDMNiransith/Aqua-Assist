import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    phoneNumber: "",
    nic: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
        const response = await axios.get('http://localhost:4000/register/' + id);

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/myprofile');
  
    try {
      await axios.put(`http://localhost:4000/register/${id}`, user);
      alert("User has been updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div>
      <div className="container" style={{ width: "30%" }}>
        <br />
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="col-md-12 text-center">
              <h2>Update User</h2>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstname">Name</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={user.firstname}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nic">NIC Number</label>
            <input
              type="text"
              className="form-control"
              name="nic"
              value={user.nic}
              onChange={handleChange}
            />
          </div>

          <br />

          <button type="submit" className="btn btn-primary">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
