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
    oneStar: {type: [String]},
    twoStar: {type: [String]},
    threeStar: {type: [String]},
    fourStar: {type: [String]},
    fiveStar: {type: [String]},
  }
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;