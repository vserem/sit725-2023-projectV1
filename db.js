const { default: mongoose } = require("mongoose");

let db;
const uri = "mongodb+srv://acms:_V56H4yD$2N7.5X@cluster0.5mtadof.mongodb.net/ACMS?retryWrites=true&w=majority"
// const uri = "mongodb+srv://acms:iJ96LqwsH9xRWDB@cluster0.ho8xusg.mongodb.net/ACMS?retryWrites=true&w=majority"
mongoose.connect(uri)
    .then(db => {
        db = db
        console.log("Database Connected")
    })
    .catch(err=>{
        throw err
    })


    module.exports = db