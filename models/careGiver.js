const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    approved: { type: Boolean, require: true, default: false },
    assignedResidents: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Resident',
    }],
})

const CareGiver = mongoose.model("CareGiver", schema)