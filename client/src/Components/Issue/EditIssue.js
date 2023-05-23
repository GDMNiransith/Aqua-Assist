import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const EditIssue = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [issue, setIssue] = useState({
        issueHeader: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const [message, setMessage] = useState('');

    const { issueHeader, streetAddress, city, state, zipCode } = issue;

    useEffect(() => {
        loadIssue();
    }, []);

    const loadIssue = async () => {
        const result = await axios.get('http://localhost:4000/issue/' + id);
        setIssue(result.data);
    };

    const handleChange = (e) => {
        setIssue({ ...issue, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        Navigate('/myIssue');
      
        try {
          await axios.put(`http://localhost:4000/issue/${id}`, issue);
          alert("Issue has been updated successfully!");
        } catch (error) {
          console.error(error);
          alert('Something went wrong!');
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

                <form onSubmit={submitForm}>
    <div className="form-group">
        <div className='col-md-12 text-center'><h2>Update Issue</h2></div>
    </div>
    <div className="form-group">
        <div className='col-md-12 text-center'><h2></h2></div>
    </div>

    <div className="form-group">
        <label htmlFor="issueHeader">IssueHeader</label>
        <input
            type="text"
            className="form-control"
            name="issueHeader"
            value={issueHeader}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label htmlFor="streetAddress">StreetAddress</label>
        <input
            type="text"
            className="form-control"
            name="streetAddress"
            value={streetAddress}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label htmlFor="city">city</label>
        <input
            type="text"
            className="form-control"
            name="city"
            value={city}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label htmlFor="state">State</label>
        <input
            type="text"
            className="form-control"
            name="state"
            value={state}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label htmlFor="zipCode">ZipCode</label>
        <input
            type="number"
            className="form-control"
            name="zipCode"
            value={zipCode}
            onChange={handleChange}
        />
    </div>

    <br />

    <button type="submit" className="btn btn-primary">
        Update Issue
    </button>
</form>

            </div>
        </div>
    );
};

export default EditIssue;