const mongoose = require('mongoose')

const project = new mongoose.Schema({
    project_name : { type : String , default : null},
    description : {type : String , default : null},
    project_leader : {type : mongoose.SchemaTypes.ObjectId , ref : 'employee' ,default : null},
    categoryId : {type : mongoose.SchemaTypes.ObjectId,ref : 'category',default : null},
    lastDate : {type : Date , default : Date.now()},
    status : {type : Boolean , default : true},
    created_at : {type : Date, default : Date.now()},
    iscompleted : {type : Boolean , default : false}
})

module.exports = new mongoose.model('project',project)