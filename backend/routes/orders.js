const router = require('express').Router();
let Order = require('../models/order.model');

// http:localhost:5000/orders/ _ get all order
router.route('/').get((req, res) => {
  console.log(req.params.id)
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get the total order of the current date 
router.route('/total').get((req, res) => {
  let returnValue = 0
  let currDate = new Date()
  Order.find()
    .then(orders => {
      orders.forEach(order => {
        if (order.createdAt.toDateString() === currDate.toDateString()) {
          returnValue += order.total
        }
      })
      res.json({"total": returnValue})
    })
    .catch(err => res.status(400).json('Error:' + err))
});

// http:localhost:5000/orders/add : add new order
router.route('/add').post((req, res) => {
  const customerID = req.body.customerID;
  const items = req.body.items
  const total = req.body.total;

  const newOrder = new Order({customerID, items, total});

  newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;