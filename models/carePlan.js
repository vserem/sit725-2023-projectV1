const { default: mongoose } = require("mongoose");

const carePlanSchema = new mongoose.Schema({
    // Resident for whom the care plan is created (reference to the Resident model)
    resident: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Resident',
        required: true,
    },
    // Care plan title or name (e.g., "Monthly Care Plan," "Special Needs Plan")
    title: String,

    // Date when the care plan was created
    dateCreated: {
        type: Date,
        default: Date.now,
    },

    // List of care goals and interventions
    goals: [{
        goal: String,
        interventions: [String],
    }],

    // Additional notes or instructions related to the care plan
    notes: String,
});

// Create the Care Plan model
const CarePlan = mongoose.model('CarePlan', carePlanSchema);

module.exports = CarePlan;