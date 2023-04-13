const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'PaymentSlips'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext); // Use original file name with a timestamp
  },
});

const upload = multer({ storage: storage });

const Donation = require('../model/Donation');

router.post('/add', upload.fields([{ name: 'paymentSlip' }]), async (req, res) => {
  const {
    issuename,
    fullname,
    nic,
    gender,
    email,
    phoneNumber,
    bank,
    branch,
    amount,
  } = req.body;

  const { paymentSlip } = req.files;
  
  try {
    const newDonation = new Donation({
      issuename,
      fullname,
      nic,
      gender,
      email,
      phoneNumber,
      bank,
      branch,
      amount,
      paymentSlip: paymentSlip[0].filename, // Use the saved filename instead of path
    });

    await newDonation.save();

    res.status(200).json({ message: 'Donation added successfully' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'An error occurred while adding the donation' });
  }
});



// UPDATE an existing donation by id
router.put('/:id', getDonation, async (req, res) => {
  const {
    issuename,
    fullname,
    nic,
    email,
    phoneNumber,
    bank,
    branch,
    amount,
  } = req.body;

  if (issuename) {
    res.donation.issuename = issuename;
  }

  if (fullname) {
    res.donation.fullname = fullname;
  }

  if (nic) {
    res.donation.nic = nic;
  }


  if (email) {
    res.donation.email = email;
  }

  if (phoneNumber) {
    res.donation.phoneNumber = phoneNumber;
  }

  if (bank) {
    res.donation.bank = bank;
  }

  if (branch) {
    res.donation.branch = branch;
  }

  if (amount) {
    res.donation.amount = amount;
  }

  try {
    const updatedDonation = await res.donation.save();
    res.json(updatedDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Middleware function to get a donation by id
async function getDonation(req, res, next) {
  let donation;
  try {
    donation = await Donation.findById(req.params.id);
    if (donation == null) {
      return res.status(404).json({ message: "Donation not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.donation = donation;
  next();
}

module.exports = router;