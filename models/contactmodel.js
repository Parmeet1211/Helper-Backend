const mongoose = require("mongoose")

const contact = new mongoose.Schema({
    name : {type : String , default : null},
    email : {type : String , default : null},
    description : { type : String , default : null},
    subject : { type : String , default :null},
    status : { type : Boolean ,default : null},
    created_at : {type : Date , default : Date.now()}
})

module.exports = new mongoose.model('contact',contact)