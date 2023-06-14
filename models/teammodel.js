const mongoose = require('mongoose')

const team = new mongoose.Schema({
    teamType : {type : Number , default : 1},
    // 1-designer 2-developer 3-testing 4-maintenance
    projectId : {type : mongoose.SchemaTypes.ObjectId , ref : 'project' , default : null},
    empId : {type : mongoose.SchemaTypes.ObjectId, ref : 'employee' , default : null},
    status : {type : Boolean ,default : true},
    created_at : {type : Date ,default : Date.now()}
})

module.exports = new mongoose.model('team',team)