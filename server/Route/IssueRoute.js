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

// GET all issues
router.get('/', async (req, res) => {
  try {
    // Retrieve all issues from the database
    const issues = await Issue.find();

    // Extract the required fields from each issue
    const issueData = issues.map((issue) => ({
      issueHeader: issue.issueHeader,
      streetAddress: issue.streetAddress,
      city: issue.city,
      state: issue.state,
      zipCode: issue.zipCode,
      _id: issue._id, 
      description: issue.description,
      image: '../../server/IssueImages/' + issue.image// Add the _id field
    }));

    res.status(200).json(issueData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while retrieving the data' });
  }
});

// GET a single issue by id
router.get("/:id", getIssue, (req, res) => {
  res.json(res.issue);
});

//Home get issue
router.post("/post", async (req, res) => {
  const issue = new Issue({
    IssueHeader: req.body.IssueHeader,
    StreetAddress: req.body.StreetAddress,
    City: req.body.City,
    State: req.body.State,
    Zip: req.body.Zip,
    image: '../../server/IssueImages/' + issue.image
  });

  try {
    const newIssue = await issue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// CREATE a new issue
router.post("/", async (req, res) => {
  const issue = new Issue({
    IssueHeader: req.body.IssueHeader,
    StreetAddress: req.body.StreetAddress,
    City: req.body.City,
    State: req.body.State,
    Zip: req.body.Zip,
   
  });

  try {
    const newIssue = await issue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an existing issue by id
router.put('/:id', getIssue, async (req, res) => {
  const { issueHeader, streetAddress, city, state, zipCode } = req.body;

  if (issueHeader) {
    res.issue.issueHeader = issueHeader;
  }

  if (streetAddress) {
    res.issue.streetAddress = streetAddress;
  }

  if (city) {
    res.issue.city = city;
  }

  if (state) {
    res.issue.state = state;
  }

  if (zipCode) {
    res.issue.zipCode = zipCode;
  }

  try {
    const updatedIssue = await res.issue.save();
    res.json(updatedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an existing issue by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndRemove(req.params.id);
    if (!deletedIssue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Middleware function to get an issue by id
async function getIssue(req, res, next) {
  let issue;
  try {
    issue = await Issue.findById(req.params.id);
    if (issue == null) {
      return res.status(404).json({ message: "Issue not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.issue = issue;
  next();
}


module.exports = router;