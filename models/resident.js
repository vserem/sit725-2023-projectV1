const { default: mongoose } = require("mongoose");


const schema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: false, set: v => v === '' ? null : v },
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: String,
    phone: String,
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    nextOfKin: {
        name: String,
        relationship: String,
        phoneNumber: String,
        email: String,
    },
    allergies: [String],
    medicalConditions: [String],
    admissionDate: { type: Date, required: true, default: Date.now },
}, { timestamps: true })

const Resident = mongoose.model("Resident", schema);

module.exports = Resident;

