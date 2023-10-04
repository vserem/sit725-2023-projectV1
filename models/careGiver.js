const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: String,
    phone: String,
    email:{
        type:String,
        required:true
    },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },

    assignedResidents: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Resident',
    }],
})

const CareGiver = mongoose.model("CareGiver", schema)

module.exports = CareGiver