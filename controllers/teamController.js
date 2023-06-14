const Team = require('../models/teammodel')

function addTeam(req,res){
    console.log(req.body)
    var validate = ""
    if(req.body.teamType == ""){
        validate+="Team is reqd \n"
    }
    if(req.body.projectId == ""){
        validate+="Project is reqd \n"
    }
    if(req.body.empId == ""){
        validate+="Employee is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        let teamObj = new Team()
        teamObj.teamType = req.body.teamType
        teamObj.projectId = req.body.projectId
        teamObj.empId = req.body.empId
        console.log(teamObj)
        teamObj.save()
        res.json({
            status : 200,
            success : true,
            msg : 'Data inserted'
        })
    }
    
}

function allteams(req,res){
    Team.find(req.body).populate('projectId').populate('empId').then(
        data=>{
            if(data == null){
                res.json({
                    status : 409,
                    success : false,
                    msg : 'Data not found'
                })
            }
            else{
                res.json({
                    status : 200,
                    success : true,
                    msg : 'Data retrived',
                    data : data
                })
            }
        }
    )
}

function singleTeam (req,res){
    var validate = ""
    if(req.body.projectId == "")
    {
        validate+="Id is required \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Team.findOne({projectId : req.body.projectId}).populate('projectId').populate('empId').then(
            data=>{
                res.json({
                    status : 200,
                    success : true,
                    msg : 'data retrived',
                    data : data
                })
            }
        )
    }
}

function updateTeam (req,res){
    var validate = ""
    if(req.body.teamType == ""){
        validate+="Team is reqd \n"
    }
    if(req.body.projectId == ""){
        validate+="Project is reqd \n"
    }
    if(req.body.empId == ""){
        validate+="Employee is reqd \n"
    }
    if(req.body._id == ""){
        validate+="Id is reqd"
    }
    if(!!validate){
        res.json(
            {
                status : 409,
                success : false,
                msg : validate
            }
        )
    }
    else{
        Team.findOne({_id : req.body._id}).then(
            data =>{
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Data not found'
                    })
                }
                else{

                    data.teamType = req.body.teamType
                    data.projectId = req.body.projectId
                    data.empId = req.body.empId
                    data.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Data updated',
                        data:data
                    })
                }
            }
        )
    }
}

module.exports = {
    addTeam,
    allteams,
    singleTeam,
    updateTeam
}