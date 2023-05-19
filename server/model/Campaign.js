const mongoose = require('mongoose');


const campaignSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type :String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  organizerName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
 
});


const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
