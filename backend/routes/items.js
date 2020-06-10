const router = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req, res) => {
  const imgSrc = req.body.imgSrc;
  const name = req.body.name
  const price = req.body.price;
  const description = req.body.description;
  const newItem = new Item({imgSrc, name, price, description});

  newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
  Item.findById(req.params.id)
    .then(res => {
      res.name = req.body.name
      res.imgSrc = req.body.imgSrc
      res.price = req.body.price
      res.description = req.body.description
      res.save()
    })
})

router.route('/delete/:id').delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
  .then(() => res.json('Exercise deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;