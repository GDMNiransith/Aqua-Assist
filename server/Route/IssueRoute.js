const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'IssueImages'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext); // Use original file name with a timestamp
  },
});

const upload = multer({ storage: storage });

const Issue = require('../model/Issue');

router.post('/add', upload.fields([{ name: 'image' }, { name: 'letter' }]), async (req, res) => {
  const {
    issueHeader,
    streetAddress,
    city,
    state,
    zipCode,
    description,
    agentsName,
    agentsAddress,
    agentsPhone,
  } = req.body;

  const { image, letter } = req.files;

  try {
    const newIssue = new Issue({
      issueHeader,
      streetAddress,
      city,
      state,
      zipCode,
      description,
      agentsName,
      agentsAddress,
      agentsPhone,
      image: image[0].filename, // Use the saved filename instead of path
      letter: letter[0].filename, // Use the saved filename instead of path
    });

    await newIssue.save();

    res.status(200).json({ message: 'Issue added successfully' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'An error occurred while adding the issue' });
  }
});



module.exports = router;