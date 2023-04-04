const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  issueHeader: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  agentsName: {
    type: String,
    required: true,
  },
  agentsAddress: {
    type: String,
    required: true,
  },
  agentsPhone: {
    type: String,
    required: true,
  },
  letter: {
    type: String,
    required: true,
  },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
