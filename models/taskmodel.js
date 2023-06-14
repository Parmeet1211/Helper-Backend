const mongoose = require('mongoose')

const task = new mongoose.Schema({
    taskname : {type : String , default :null},
    employeeId : {type : mongoose.SchemaTypes.ObjectId , ref:'employee',default : null},
    description : {type : String , default :null},
    priority : { type : Number , default : 1 },
    // 1-high 2-medium 3-low
    projectId : {type : mongoose.SchemaTypes.ObjectId , ref : 'project' , default : null},
    categoryId : {type : mongoose.SchemaTypes.ObjectId , ref : 'category' , default : null},
    lastDate : {type : Date , default : Date.now()},
    status : {type : Boolean , default :true},
    created_at :{type : Date , default : Date.now()},
    iscomplete : {type : Boolean , default : false},
    progress : {type : Number , default : 0}
})

module.exports = new mongoose.model('task',task)