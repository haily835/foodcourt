const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerID: {
    type: String,
    required: true
  },
  items: {
    type: [Object],
    required: true,
  },
  total: {
    type: Number,
    required:true,
  },
  status: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;