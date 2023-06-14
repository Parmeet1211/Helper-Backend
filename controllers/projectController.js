const Project = require('../models/projectmodel')

function addProject(req,res){
    var validate = ""
    if(req.body.project_name == ""){
        validate+="Project Name is reqd \n"
    }
    if(req.body.description == ""){
        validate+="Description is reqd \n"
    }
    if(req.body.project_leader == ""){
        validate+="Project Leader is reqd \n"
    }
    if(req.body.categoryId == ""){
        validate+="Category is reqd \n"
    }
    if(req.body.lastDate == ""){
        validate+="Last date is reqd \n"
    }
    if(req.body.iscompleted == ""){
        validate+="Iscompleted status is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Project.findOne({project_name : req.body.project_name}).then(
            data=>{
                if(data == null){
                    let projectObject = new Project()
                    projectObject.project_name = req.body.project_name
                    projectObject.project_leader = req.body.project_leader
                    projectObject.description = req.body.description
                    projectObject.categoryId = req.body.categoryId
                    projectObject.lastDate = req.body.lastDate
                    projectObject.iscompleted = req.body.iscompleted
                    projectObject.save()

                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Data inserted'
                    })
                }
                else{
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Project name already exists'
                    })
                }
            }
        ).catch(
            err=>{
                res.json({
                    status : 500,
                    success : false,
                    msg : 'Server error',
                    error : String(err)
                })
            }
        )
    }

}

function getallproject(req,res){
    Project.find(req.data).populate('categoryId').populate('project_leader').exec().then(
        data=>{
            res.json({
                status : 200,
                success : true,
                msg : 'data retrieved',
                data : data
            })
        }
    ).catch(
        err=>{
            res.json({
                status : 500,
                success : true,
                msg : 'Error in loading data',
                error : String(err)
            })
        }
    )
}

function singleProject(req,res){
    var validate = ""
    if(req.body._id == ""){
        validate+="Id is reqd"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Project.findOne({_id : req.body._id}).populate('categoryId').populate('project_leader').then(
            data=>{
                res.json({
                    status : 200,
                    success : true,
                    msg : 'data retrived',
                    data : data
                })
            }
        ).catch(
            err=>{
                res.json({
                    status : 500,
                    success : false,
                    msg : 'server error',
                    error : String(err)
                })
            }
        )
    }
}

function updateProject(req,res){
    var validate = ""
    if(req.body.project_name == ""){
        validate+="Project Name is reqd \n"
    }
    if(req.body.description == ""){
        validate+="Description is reqd \n"
    }
    if(req.body.project_leader == ""){
        validate+="Project Leader is reqd \n"
    }
    if(req.body.categoryId == ""){
        validate+="Category is reqd \n"
    }
    if(req.body.lastDate == ""){
        validate+="Last date is reqd \n"
    }
    if(req.body.iscompleted == ""){
        validate+="Iscompleted status is reqd \n"
    }
    if(req.body._id == ""){
        validate+="Id status is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Project.findOne({_id : req.body._id}).populate('categoryId').then(
            data=>{
                if(data == null){
                    res.json({
                        status : 409,
                        success :false,
                        msg : 'ID not exists'
                    })
                }
                else{
                    data.project_name = req.body.project_name
                    data.description = req.body.description
                    data.project_leader = req.body.project_leader
                    data.categoryId = req.body.categoryId
                    data.iscompleted = req.body.iscompleted
                    data.lastDate = req.body.lastDate
                    data.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'data updated'
                    })
                }
            }
        )
    }
}

module.exports = {
    addProject,
    getallproject,
    singleProject,
    updateProject
}