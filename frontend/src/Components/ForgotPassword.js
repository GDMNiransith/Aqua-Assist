import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/check-email-exists/${email}`);
      if (response.data.exists) {

        await axios.post(`/api/send-verification-code/${email}`);
        setCodeSent(true);
      } else {
        setError('Email does not exist');
      }
    } catch (error) {
      setError('Error checking email');
    }
  };

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/verify-code', { email, code });
      if (response.data.valid) {
        window.location.href = `/reset-password/${email}`;
      } else {
        setError('Invalid verification code');
      }
    } catch (error) {
      setError('Error verifying code');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      {!codeSent ? (
        <form onSubmit={handleEmailSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <button type="submit">Send Verification Code</button>
          {error && <div>{error}</div>}
        </form>
      ) : (
        <form onSubmit={handleCodeSubmit}>
          <label>
            Verification Code:
            <input type="text" value={code} onChange={(event) => setCode(event.target.value)} />
          </label>
          <button type="submit">Verify Code</button>
          {error && <div>{error}</div>}
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
