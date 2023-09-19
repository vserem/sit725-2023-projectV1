var express = require('express');
const User = require('../models/user');
var router = express.Router();


/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.json({ 'error': error })
  }
});

/* Post create user */
router.post("/", async function (req, res, next) {
  var body = req.body
  try {
    var hashPassword = await bcrypt.hash(body.password, 13)
  } catch (error) {
    res.sendStatus(500)
  }
  /* Try to add user to DB */
  try {
    const user = await User.create({ email: body.email, password: hashPassword, role: body.role })
    res.status(201).json(user);
  } catch (err) {
    if (err.errors.email && err.errors.email.kind === "unique") {
      res.status(400).json({ "error": `User with email ${err.errors.email.value} already exists` });
      return
    }
    res.status(500).json({ "error": err.errors.email });
  }

});

module.exports = router;
