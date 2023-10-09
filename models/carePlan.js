const mongoose = require("mongoose");

const carePlanSchema = new mongoose.Schema({
    // Resident for whom the care plan is created (reference to the Resident model)
    resident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    caregiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CareGiver",
        required: true,
    },
    // Care plan title or name
    title: String,
    // List of care goals
    goals: [String],

    // List of tasks or activities associated with the care plan
    activities: [String]
},{timestamps:true});


// Create the Care Plan model
const CarePlan = mongoose.model("CarePlan", carePlanSchema);

module.exports = CarePlan;