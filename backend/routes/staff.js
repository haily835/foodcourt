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

// update by id 
router.route('/:id').post((req, res) => {
  Staff.findById(req.params.id)
    .then(res => {
      res.name = req.body.name
      res.email = req.body.email
      res.idNumber = req.body.idNumber
      res.phoneNumber = req.body.phoneNumber
      res.gender = req.body.gender
      res.role = req.body.role
      res.age = req.body.age
      res.save()
        .then(() => res.json('Staff modified'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
})

module.exports = router;