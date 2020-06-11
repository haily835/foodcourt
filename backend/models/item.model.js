const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  imgSrc: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required:true,
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    oneStar: {type: Number},
    twoStar: {type: Number},
    threeStar: {type: Number},
    fourStar: {type: Number},
    fiveStar: {type: Number}
  }
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;