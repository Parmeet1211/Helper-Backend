const mongoose = require("mongoose")

const enquiry = new mongoose.Schema({
    enqNo : {type : String , default : null},
    empId : {type : mongoose.SchemaTypes.ObjectId , ref : 'employee' , default : null},
    description : { type : String , default : null},
    subject : { type : String , default :null},
    status : { type : Boolean ,default : null},
    created_at : {type : Date , default : Date.now()},
    reply : {type :String , default : null}
})

module.exports = new mongoose.model('enquiry',enquiry)