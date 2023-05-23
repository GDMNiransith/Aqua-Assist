const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  issuename: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  nic: {
    type: String,
    required: true
  },
  gender: {
    type: String,
   
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentSlip: {
    type: String,
    required: false
  },
});

const Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;