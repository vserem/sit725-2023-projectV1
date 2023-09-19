const { default: mongoose } = require("mongoose");

let db;

mongoose.connect("mongodb+srv://acms:_V56H4yD$2N7.5X@cluster0.5mtadof.mongodb.net/ACMS?retryWrites=true&w=majority")
    .then(db => {
        db = db
        console.log("Database Connected")
    })
    .catch(err=>{
        throw err
    })


    module.exports = db