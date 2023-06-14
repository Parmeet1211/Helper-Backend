const mongoose = require('mongoose')

const category = new mongoose.Schema({
    category_name : { type : String , default : null},
    description : {type : String , default : null},
    status : {type : Boolean , default :true},
    created_at : {type : Date,default : Date.now()}
})

module.exports = new mongoose.model('category',category)