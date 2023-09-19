var express = require('express');
const Resident = require('../models/resident');
const checkUserRole = require('../middlewares');
const Profile = require('../models/profile');
var router = express.Router();

/* GET Home Page. */
router.get('/', function (req, res) {
  res.render('home.njk', { title: 'ACMS | Home' });
});

/* GET Dashboard. */
router.get('/dashboard', checkUserRole(["caregiver", "admin"]), async function (req, res) {
  try {
    const residents = await Resident.find()
    return res.render('dashboard.njk', { title: 'ACMS | Dashboard', user: req.user, residents: residents });
  } catch (error) {
    return res.render('dashboard.njk', { title: 'ACMS | Dashboard', user: req.user });
  }
});

router.get('/profile', checkUserRole(['caregiver', 'admin']), async function (req, res) {
  try {
    const profile = await Profile.findOne({ user: req.user._id })
    return res.render('profile.njk', { title: 'ACMS | Profile', user: req.user, profile: profile });
  } catch (error) {
    return res.render('profile.njk', { title: 'ACMS | Profile', user: req.user });
  }
});

router.post('/profile', checkUserRole(['caregiver', 'admin']), async function (req, res) {
  console.log(req.body);
  try {
    const profile = new Profile({ ...req.body, user: req.user._id });
    await profile.save();
    req.flash("success", "Profile Updated")
    return res.redirect("/profile")

  } catch (error) {
    console.log(error);
    return res.redirect("/profile")
  }
});

module.exports = router;
