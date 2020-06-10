const router = require('express').Router();
let User = require('../models/user.model');

router.route('/:id').get((req, res) => {
  console.log(req.params.id)
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:email/:password').get((req, res) => {
  User.find(req.params)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email
  const password = req.body.password;
  const role = req.body.role;

  const newUser = new User({username, email, password, role});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;