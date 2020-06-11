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
  const rating = {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0
  }
  const newItem = new Item({imgSrc, name, price, description, rating});

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

router.route('/rating/:id').post((req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      let star = req.body.rating
      item.rating[star] += 1
      item.save()
      return res.json('Item has been rated')
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/delete/:id').delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
  .then(() => res.json('Item deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;