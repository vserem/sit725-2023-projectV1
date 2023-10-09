var express = require('express');
const checkUserRole = require('../middlewares');
const Resident = require('../models/resident');
const CareGiver = require('../models/careGiver');
var router = express.Router();

/* GET New CareGiver Page. */
router.get('/residents', async function (req, res) {
    const caregiver = req.body;
    try {
        const caregiver = CareGiver.findOne({_id:req.user._id}).populate('assignedResidents')
        return res.render('newcaregiver.njk', { title: 'ACMS | New CareGiver',caregiver });
    } catch (error) {
        res.render('newcaregiver.njk', { title: 'ACMS | New CareGiver' });
    }
});



module.exports = router;
