var express = require('express');
const passport = require('passport');
var router = express.Router();
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

router.get('/signup', function (req, res) {
    res.render('signup.njk', { title: "ACMS | SignUp", messages: req.flash() });
});


router.post('/signup', async function (req, res, next) {
    try {
        const { email, password, role } = req.body;
     
    
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            req.flash('error', 'An account with this email already exists.');
            return res.redirect(302, '/auth/signup');
        }

        const user = new User({ email, password, role });
        await user.save();
        req.flash('success', 'Account registered successfully. You can now log in.');
        res.redirect(302, '/auth/signin');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Registration failed. Please try again.');
        res.redirect(302, '/auth/signup');
    }
});

router.get('/signin', function (req, res) {
    res.render('signin.njk', { title: "ACMS | SignIn", messages: req.flash() });
});

router.post('/signin', passport.authenticate('local', { successRedirect: "/dashboard", failureRedirect: '/auth/signin', failureFlash: true }));

router.get('/signout', function (req, res, next) {
    req.logout({}, (err) => {
        if (err) {
            return next(err)
        }
        res.redirect(302, '/auth/signin');
    });
});

router.post("/password_change",async function (req,res,next){
    try {
        const instance = await User.findOne({_id:req.user._id})
        instance.password = req.body.password;
        await instance.save()
        return res.redirect("/profile")
    } catch (error) {
        console.log("Errror: ",error);
        return res.redirect("/profile")
    }
});







module.exports = router