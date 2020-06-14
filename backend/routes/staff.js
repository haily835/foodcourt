const router = require('express').Router();
let Staff = require('../models/staff.model');

router.route('/').get((req, res) => {
  Staff.find()
    .then(staff => res.json(staff))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const idNumber = req.body.idNumber;
  const age = req.body.age;
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const role = req.body.role;
  
  const newStaff = new Staff({name, email, idNumber, age, phoneNumber, gender, role});

  newStaff.save()
    .then(() => res.json('Staff added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;