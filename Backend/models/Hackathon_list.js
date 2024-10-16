const mongoose = require("mongoose");

const listschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  problemStatements: [{
    statement: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    category: {
      type: {
        software: {
          type: Boolean,
          required: true,
        },
        hardware: {
          type: Boolean,
          required: true,
        }
      },
      required: true,
    },
  }]
});

module.exports = mongoose.model('Hackathon', listschema);
