const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require("../models/User");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwts ="bnaxfahfv@";

router.post('/userCreate', [
  check('Email').isEmail(),
  check('Name').notEmpty(),
  check('Password').isLength({ min: 6 }),
  check('location').notEmpty(),
], async (req, res) => {
  const salt = await bycrpt.genSalt(10);
  let scepass = await bycrpt.hash(req.body.Password,salt)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { Email, Name, Password, location } = req.body;
  try {
    const user = new User({ Email, Name, Password:scepass, location });
    await user.save();
    console.log('User created:', user);
    res.status(201).json({ success: true, user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
router.post('/Login', [
  check('Email').isEmail(),
  check('Password').isLength({ min: 6 }),

], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  let Email = req.body.Email;
 
  try {
    letdata = await User.findOne({ Email });
    if (!letdata) {
      return res.status(400).json({ errors: "not find data" });
    }
    const pwc = await bycrpt.compare(req.body.Password,letdata.Password)
    if (!pwc) {
      return res.status(400).json({ errors: "Password incoreect" });
    }
    const data ={
      users:{
        id:letdata.id
      }
    }
    const auto = jwt.sign(data,jwts);
    return res.json({ success: true,auto })
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
