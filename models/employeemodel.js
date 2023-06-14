const mongoose = require("mongoose")

const employee= new mongoose.Schema({
    employee_name : {type : String , default : null},
    employee_id : {type : String , default : null},
    role : {type : String , default : null},
    email : {type : String , default : null},
    password : {type : String , default : null},
    userId : {type : mongoose.SchemaTypes.ObjectId,ref:'user' , default : null},
    status : {type : Boolean , default : null},
    created_at : {type : Date, default : Date.now()},
    contact : {type : Number , default : null},
    address : {type : String,default : null},
    image : {type : String , default : 'no-img.png'}

})

module.exports = new mongoose.model('employee',employee)