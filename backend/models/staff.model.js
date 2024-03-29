const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required:true,
  },
  imgUrl: {
    type: String,
  },
  age: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;