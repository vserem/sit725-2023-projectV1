var express = require('express');
const checkUserRole = require('../middlewares');
const CareGiver = require('../models/careGiver');
const Resident = require('../models/resident');
const CarePlan = require('../models/carePlan');
const { default: mongoose } = require('mongoose');
const User = require('../models/user');
var router = express.Router();

router.get('/profile', function (req, res) {
    res.render('profile.njk', { title: 'ACMS | Profile' });
});

router.get('/dashboard', async (req, res) => {
    try {
        const residents = await Resident.find()
        const caregivers = await CareGiver.find()
        const careplans = await CarePlan.find()
        return res.render("admin_dashboard.njk", { title: "ACMS | Admin Dashbard", caregivers, residents, careplans })
    } catch (err) {
        return res.render("admin_dashboard.njk", { title: "ACMS | Admin Dashbard" })
    }


})

router.post('/profile', function (req, res) {
    console.log(req.body);
    res.json(req.body)
});

router.get('/newcaregiver', async (req, res) => {
    return res.render("newcaregiver.njk", { title: "ACMS | New CareGiver" })
})

// Create a new caregiver
router.post('/newcaregiver', async (req, res) => {
    console.log("Body: ", req.body);
    const { fullName, email, password, gender, address, dateOfBirth, phone } = req.body;
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const user = await User.create({ email, password, role: "caregiver" })
        await CareGiver.create({
            fullName,
            gender,
            user: user._id,
            dateOfBirth,
            phone,
            address,
            email
        })
        await session.commitTransaction()
        await session.endSession()
        return res.redirect("/admin/caregivers")

    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        req.flash("error", "failed to add caregiver")
        return res.redirect("/admin/newcaregiver")
    }

});

// List all caregivers
router.get('/caregivers', async (req, res) => {
    try {
        const caregivers = await CareGiver.find();
        return res.render('caregivers.njk', { title: "Admin | CareGivers", caregivers })
    } catch (error) {
        return res.render('caregivers.njk', { title: "Admin | CareGivers" })
    }
});

// View a specific caregiver
router.get('/caregivers/:id', async (req, res) => {
    try {
        const caregiver = await CareGiver.findById(req.params.id).populate("assignedResidents");
        const residents = await Resident.find();

        return res.render('caregiver-detail.njk', { title: "Admin | Caregiver Detail", caregiver, residents })
    } catch (error) {
        return res.render('caregiver-detail.njk', { title: "Admin | Caregiver Detail" })
    }
});

router.post("/caregivers/:id/assign", async (req, res) => {
    console.log("Resident Id: ",req.body.residentId);
    try {
        const caregiver = await CareGiver.findById(req.params.id)
        
        const resident = await Resident.findById(req.body.residentId)
        caregiver.assignedResidents.push(resident._id);

        await caregiver.save()
        req.flash("success","resident assigned to caregiver")
        return res.redirect(`/admin/caregivers/${caregiver._id}`)
    } catch (err) {
        console.log(err);
        req.flash("error","failed to assign resident to caregiver")
        return res.redirect("/admin/caregivers")
    }
})





// Update a caregiver's information
router.put('/caregivers/:id', async (req, res) => {
    try {
        const caregiver = await CareGiver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!caregiver) {
            req.flash("error", "Failed to Update Caregiver")
            return res.redirect(req.path)
        }
        return res.redirect(req.path)
    } catch (error) {
        return res.redirect(req.path)
    }
});

// Delete a caregiver
router.delete('/caregivers/:id', async (req, res) => {
    try {
        const caregiver = await CareGiver.findByIdAndRemove(req.params.id);
        if (!caregiver) {
            return res.status(404).json({ error: 'Caregiver not found' });
        }
        res.json({ message: 'Caregiver deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Resident routes
router.get("/newresident", (req, res) => {
    res.render("newresident.njk", { title: "Admin | New Resident" })
});


router.post("/newresident", async (req, res) => {
    console.log("Got a request");
    const { fullName, dateOfBirth, address, phone, gender, kinName, relationship, kinPhone, kinEmail } = req.body
    const allergies = String(req.body.allergies).split(",");
    const medicalConditions = String(req.body.medicalConditions).split(",")
    try {
        await Resident.create({
            fullName,
            dateOfBirth,
            address,
            phone,
            gender,
            nextOfKin: {
                name: kinName,
                relationship: relationship,
                phoneNumber: kinPhone,
                email: kinEmail,
            },
            allergies,
            medicalConditions,

        })
        req.flash("success", "Resident Added Successfully")
        return res.redirect("/admin/residents")
    } catch (err) {
        req.flash('error', 'Failed to add Resident')
        console.log("Error: ", err);
        return res.redirect("/admin/newresident")
    }

})



router.get("/residents", async (req, res) => {
    try {
        const residents = await Resident.find()
        res.render("residents.njk", { title: "Admin | Residents", residents })
    } catch (error) {
        res.render("residents.njk", { title: "Admin | Residents" })
    }
})


router.get("/residents/:id", async (req, res) => {
    try {
        const resident = Resident.findById(req.params.id)
        return res.render("resident-detail.njk", { title: "Admin | Resident Detail", resident })
    } catch (error) {
        return res.render("resident-detail.njk", { title: "Admin | Resident Detail" })
    }
})
module.exports = router;
