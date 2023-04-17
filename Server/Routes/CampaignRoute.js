const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'Notices' });


const Campaign = require('../model/Campaign');


router.post('/add', upload.single('poster'), async (req, res) => {
  try {
    
    const {
      campaignName,
      time,
      date,
      location,
      description,
      organizerName,
      contactNumber,
      email,
      requirements
    } = req.body;

    
    const newCampaign = new Campaign({
      campaignName,
      time,
      date,
      location,
      description,
      organizerName,
      contactNumber,
      email,
      requirements,
      poster: req.file.filename
    });


    const savedCampaign = await newCampaign.save();

    res.status(201).json(savedCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
// GET all issues
router.get('/', async (req, res) => {
  try {
    // Retrieve all issues from the database
    const campagins = await Campaign.find();

    // Extract the required fields from each issue
    const campaginData = campagins.map((campagin) => ({
      campaignName: campagin.campaignName,
      time: campagin.time,
      date: campagin.date,
      location: campagin.location,
      organizerName: campagin.organizerName,
      contactNumber: campagin.contactNumber,
      
      _id: campagin._id, 
      description: campagin.description,
      requirements:campagin.requirements,
      
      notice: '../../server/CampaignNotice/' + campagin.image// Add the _id field
    }));

    res.status(200).json(campaginData);
  } catch (error) {
    console.log(error);
    c
    res.status(500).json({ error: 'An error occurred while retrieving the data' });
  }
});

// GET a single campaign by id
router.get('/:id', getCampaign, (req, res) => {
  res.json(res.campaign);
});

// CREATE a new campaign
router.post('/', async (req, res) => {
  const { campaignName, time, date, location, organizerName, contactNumber } = req.body;
  const campaign = new Campaign({
    campaignName,
    time,
    date,
    location,
    organizerName,
    contactNumber,
  });

  try {
    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an existing campaign by id
router.put('/:id', getCampaign, async (req, res) => {
  const { campaignName, time, date, location, organizerName, contactNumber } = req.body;

  if (campaignName) {
    res.campaign.campaignName = campaignName;
  }

  if (time) {
    res.campaign.time = time;
  }

  if (date) {
    res.campaign.date = date;
  }

  if (location) {
    res.campaign.location = location;
  }

  if (organizerName) {
    res.campaign.organizerName = organizerName;
  }

  if (contactNumber) {
    res.campaign.contactNumber = contactNumber;
  }

  try {
    const updatedCampaign = await res.campaign.save();
    res.json(updatedCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an existing campaign by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCampaign = await Campaign.findByIdAndRemove(req.params.id);
    if (!deletedCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Middleware function to get a campaign by id
async function getCampaign(req, res, next) {
  let campaign;
  try {
    campaign = await Campaign.findById(req.params.id);
    if (campaign == null) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.campaign = campaign;
  next();
}


module.exports = router;