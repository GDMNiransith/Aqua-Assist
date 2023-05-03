import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({
    campaignName: "",
    time: "",
    date: "",
    location: "",
    organizerName: "",
    contactNumber: "",
  });

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/campaign/${id}`);
      setCampaign(response.data);
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    navigate("/myCampaign");

    try {
      await axios.put(`http://localhost:4000/campaign/${id}`, campaign);
      alert("Campaign has been updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const {
    campaignName,
    time,
    date,
    location,
    organizerName,
    contactNumber,
  } = campaign;

  return (
    <div>
      <div className="container" style={{ width: "30%" }}>
        <br />
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={submitForm}>
          <div className="form-group">
            <div className="col-md-12 text-center">
              <h2>Update Campaign</h2>
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-12 text-center">
              <h2></h2>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="campaignName">Campaign Name</label>
            <input
              type="text"
              className="form-control"
              name="campaignName"
              value={campaignName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="text"
              className="form-control"
              name="time"
              value={time}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              className="form-control"
              name="date"
              value={date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="organizerName">Organizer Name</label>
            <input
              type="text"
              className="form-control"
              name="organizerName"
              value={organizerName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              className="form-control"
              name="contactNumber"
              value={contactNumber}
              onChange={handleChange}
            />
          </div>

          <br />

          <button type="submit" className="btn btn-primary">
            Update Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCampaign;