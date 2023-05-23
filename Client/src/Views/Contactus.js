import React, { useState } from 'react';
import './Contactus.css'

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }

    if (email.trim() === '') {
      alert('Please enter your email.');
      return;
    }

    setIsSent(true);
  }


  return (
    <div>
      {isSent ? (
        <p>Message sent successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Your Message:
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
          </label>
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
