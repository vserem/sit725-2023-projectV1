var express = require('express');
const CarePlan = require('../models/carePlan');
const Resident = require('../models/resident');
const CareGiver = require('../models/careGiver');

const router = express.Router()

router.get("/", async (req,res)=>{
    try {
        const careplans = await CarePlan.find()
        res.render("careplans.njk",{title:"ACMS | Careplans",careplans})
    } catch (err) {
        res.render("careplans.njk",{title:"ACMS | Careplans"})
    }
})

router.post("/", async (req,res)=>{
    console.log("Got Request");
    const {title, residentId} = req.body
    console.log("Resident ID: ",residentId);

    const goals = String(req.body.goals).split(",")
    const activities = String(req.body.activities).split(",")
    try {
        const resident = await Resident.findById(residentId);
        const caregiver = await CareGiver.findOne({user:req.user})
        await CarePlan.create({
            title,
            goals,
            activities,
            resident:resident._id,
            caregiver: caregiver._id
        })

        res.redirect("/dashboard")
    } catch (err) {
        res.redirect("/dashboard")
    }
})

router.get("/:id", async (req,res)=>{
    try {
        const careplan = await CarePlan.findById(req.params.id)
        res.render("careplan-detail.njk",{title:"ACMS | Careplan Detail",careplan})
    } catch (err) {
        req.flash("error","failed to fetch careplans ")
        res.render("careplan-detail.njk",{title:"ACMS | Careplans"})
    }
})

module.exports =  router;