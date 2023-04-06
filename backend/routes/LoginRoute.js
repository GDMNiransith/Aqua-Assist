const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');


const JWT_SECRET = 'myjwtsecret';

router.post('/check', async (req, res) => {
  try {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
    
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
     
    }

    const isMatch = password== user.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      JWT_SECRET, 
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
        
        
      }

    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
