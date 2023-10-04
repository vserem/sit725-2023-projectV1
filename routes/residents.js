var express = require('express');
const Resident = require('../models/resident');
var router = express.Router();

router.get("/new", function (req, res, next) {
    res.render("newresident.njk", { title: "ACMS | New Resident" })
})

/* GET residents listing. */
router.get('/', async function (req, res, next) {
    try {
        const residents = await Resident.find()
        res.json(residents)
    } catch (error) {
        res.status(500).json({ "error": err })
    }
});

/* POST add new resident. */
router.post('/', async function (req, res, next) {
    var body = req.body
    const allergies = String(body.allergies).split(",");
    const medicalConditions = String(body.medicalConditions).split(",")
    try {
        const result = await Resident.create({
            fullName: body.fullName,
            dateOfBirth: body.dateOfBirth,
            address: body.address,
            phone: body.phone,
            gender: body.gender,
            nextOfKin: {
                name: body.kinName,
                relationship: body.relationship,
                phoneNumber: body.kinPhone,
                email: body.kinEmail,
            },
            allergies: allergies,
            medicalConditions: medicalConditions,

        })
        return res.redirect("/dashboard")
    } catch (err) {
        if (err.errors) {
            return res.status(400).json({ "error": "Provide all the required fields" })
        }
        console.log(err);
        return res.sendStatus(500)
    }
});

module.exports = router;