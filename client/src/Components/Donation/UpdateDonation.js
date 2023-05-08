import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const EditDonation = () => {
    const {id} =useParams();
    const Navigate = useNavigate();
    const [donation, setDonation] = useState({
        issuename: '',
        fullname: '',
        nic: '',
        email: '',
        phoneNumber: '',
        bank: '',
        branch: '',
        amount: '',
    });

    const [message, setMessage] = useState('');

    const { issuename, fullname, nic, email, phoneNumber, bank, branch, amount } = donation;

    useEffect(() => {
        loadDonation();
    }, []);

    const loadDonation = async () => {
        const result = await axios.get('http://localhost:4000/donation/' + id);
        setDonation(result.data);
    };

    const handleChange = (e) => {
        setDonation({ ...donation, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        Navigate('/mydonation');
      
        try {
          await axios.put(`http://localhost:4000/donation/${id}`, donation);
          alert("Donation has been updated successfully!");
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
        <div className='col-md-12 text-center'><h2>Update Donation</h2></div>
    </div>
    <div className="form-group">
        <div className='col-md-12 text-center'><h2></h2></div>
    </div>

    <div className="form-group">
        <label htmlFor="issue_name">issue name</label>
        <input
            type="text"
            className="form-control"
            name="issue_name"
            value={issuename}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label htmlFor="fullname">fullname</label>
        <input
            type="text"
            className="form-control"
            name="fullname"
            value={fullname}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label htmlFor="nic">nic</label>
        <input
            type="text"
            className="form-control"
            name="nic"
            value={nic}
            onChange={handleChange}
        />
    </div>

    <div className="form-group">
        <label htmlFor="email">email</label>
        <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={handleChange}
        />
    </div>
    <div className="form-group">
        <label htmlFor="phoneNumber">phoneNumber</label>
        <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
        />
        </div>

        <div className="form-group">
        <label htmlFor="bank">bank</label>
        <input
            type="text"
            className="form-control"
            name="bank"
            value={bank}
            onChange={handleChange}
        />
    </div>

    <br />
    <div className="form-group">
        <label htmlFor="branch">branch</label>
        <input
            type="text"
            className="form-control"
            name="branch"
            value={branch}
            onChange={handleChange}
        />
    </div>
    <div className="form-group">
        <label htmlFor="amount">amount</label>
        <input
            type="text"
            className="form-control"
            name="amount"
            value={amount}
            onChange={handleChange}
        />
    </div>

    <br />

    <button type="submit" className="btn btn-primary">
        Update Donation
    </button>
</form>

            </div>
        </div>
    );
};

export default EditDonation;