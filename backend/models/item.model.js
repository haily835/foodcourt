const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  imgSrc: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required:true,
  },
  description: {
    type: String,
    default: "https://www.lg.com/lg5-common-gp/images/common/product-default-list-350.jpg"
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