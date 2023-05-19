// campaign.js

const mongoose = require('mongoose');

const campaigninventorySchema = new mongoose.Schema({
  name: {
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
  organizerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  waterBottles: {
    type: Number,
    required: true
  },
  lunchPackets: {
    type: Number,
    required: true
  },
  funding: {
    type: Number,
    required: true
  },
  materials: {
    type: Number,
    required: true
  },
  coolDrinks: {
    type: Number,
    required: true
  }
});

const Campaign = mongoose.model('Campaign', campaigninventorySchema);

module.exports = Campaign;
