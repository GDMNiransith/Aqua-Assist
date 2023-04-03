const express = require('express');
const router = express.Router();
const User = require('../model/User');
const path = require('path');
const authenticateToken = require('../Auth/Auth');
const deleteAuth =require('../Auth/deleteAuth')
const jwt = require('jsonwebtoken');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

router.post('/add', upload.single('file'), async (req, res) => {
  const {
    firstName,
    lastName,
    birthday,
    gender,
    email,
    password,
    nic,
    phoneNumber,
  } = req.body;

  try {
    const user = new User({
      firstName,
      lastName,
      birthday,
      gender,
      email,
      password,
      nic,
      phoneNumber,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Middleware to get a user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

// Backend route for updating a user by ID
router.put('/:id', getUser, async (req, res) => {
  const { email, password, firstname, phoneNumber, nic } = req.body;

  if (email) {
    res.user.email = email;
  }

  if (password) {
    res.user.password = password;
  }

  if (firstname) {
    res.user.firstname = firstname;
  }

  if (phoneNumber) {
    res.user.phoneNumber = phoneNumber;
  }

  if (nic) {
    res.user.nic = nic;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Excluding the password field

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
});


// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;