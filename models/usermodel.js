const mongoose = require("mongoose")

const user= new mongoose.Schema({
    employee_name : {type : String , default : null},
    email : {type : String , default : null},
    password : {type : String , default : null},
    userType : {type : Number , default : 2},//1-admin 2-user
    status : {type : Boolean , default : null},
    created_at : {type : Date, default : Date.now()}

})

module.exports = new mongoose.model('user',user)