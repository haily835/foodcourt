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
  },
  imgUrl: {
    type: String,
  },
  age: {
    type: Number,
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
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