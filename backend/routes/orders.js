const router = require('express').Router();
let Order = require('../models/order.model');

// http:localhost:5000/orders/ _ get all order
router.route('/').get((req, res) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/week').get((req, res) => {
  let returnValue = 0
  let currDate = new Date()
  let dateArray = new Array(7);
  currDate.toDateString()
  Order.find()
    .then(orders => {
        // create an array of 7 date
        let i = 6;
        while( i >= 0 ){
          let d = new Date();

          // decrease the date
          d.setDate(currDate.getDate() - i);
          let returnValue = 0

          // find total of that date
          orders.forEach(order => {
            if (order.createdAt.toDateString() === d.toDateString()) {
              returnValue += order.total
            }
          })
          dateArray[6-i] = {time: d.getDate() + "/" +( d.getMonth() + 1) , amount: returnValue}
          i -= 1;
        }

        res.json(dateArray)
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

// get the total order of a date 
router.route('/:date').get((req, res) => {
  let returnValue = 0
  let currDate = new Date()
  Order.find()
    .then(orders => {
      orders.forEach(order => {
        if (order.createdAt.toDateString() === req.params.date) {
          returnValue += order.total
        }
      })
      res.json({"total": returnValue})
    })
    .catch(err => res.status(400).json('Error:' + err))
});

// http:localhost:5000/orders/add : add new order
router.route('/add').post((req, res) => {
  const customerID = req.body.customerID
  const items = req.body.items
  const total = req.body.total
  const status = req.body.status
  const newOrder = new Order({customerID, items, total, status});

  newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// http:localhost:5000/orders/:id/:status
// update status of an order
router.route('/:id/:status').post((req, res) => {
  Order.findById(req.params.id)
  .then(order => {
    order.status = req.params.status
    order.save()
    res.json('Order status updated')
  })
  .catch(err => res.status(400).json('Error:' + err))
});

module.exports = router;