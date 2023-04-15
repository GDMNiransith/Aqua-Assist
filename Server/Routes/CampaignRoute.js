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


module.exports = router;