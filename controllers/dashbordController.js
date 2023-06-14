const Employee = require('../models/employeemodel')
const Task = require('../models/taskmodel')
const Project = require('../models/projectmodel')
const Team = require('../models/teammodel')
const Enquiry = require('../models/enquirymodel')
const Category = require('../models/categorymodel')
// const { trace } = require('../routes/adminroutes')


dashboard = async (req,res)=>{
    totalemployee = 0
    totaltask = 0
    totalproject = 0
    totalteam = 0
    totalenquiry = 0
    totalcategory = 0
    totaldeveloper = 0
    totalhighpriority = 0
    totalmediumpriority = 0
    totaldesigner = 0
    totaltester = 0
    totalmaintenance = 0
    totaltester = 0
    completedtasks = 0
    pendingtasks = 0

    await Employee.countDocuments().then(
        employeecount =>{
            totalemployee = employeecount
        }
    )

    await Task.countDocuments().then(
        taskcount =>{
            totaltask = taskcount
        }
    )


    await Project.countDocuments().then(
        projectcount =>{
            // console.log(projectcount)
            totalproject = projectcount
        }
    )

    await Category.countDocuments().then(
        categorycount =>{
            totalcategory = categorycount
        }
    )

    await Team.countDocuments().then(
        teamcount =>{
            totalteam = teamcount
        }
    )

    await Team.find({teamType : 2}).countDocuments().then(
        developercount =>{
            totaldeveloper = developercount
        }
    )

    await Enquiry.countDocuments().then(
        enquirycount =>{
            totalenquiry = enquirycount
        }
    )
    await Task.countDocuments({priority : 1}).then(
        highcount => {
            totalhighpriority = highcount
        }
    )
    await Task.countDocuments({priority : 2}).then(
        mediumcount=>{
            totalmediumpriority = mediumcount
        }
    )
    await Team.find({teamType : 1}).countDocuments().then(
        designercount =>{
            totaldesigner = designercount
        }
    )
    await Team.find({teamType : 3}).countDocuments().then(
        testercount =>{
            totaltester = testercount
        }
    )
    await Team.find({teamType : 4}).countDocuments().then(
        maintenancecount =>{
            totalmaintenance = maintenancecount
        }
    )
    await Task.find({iscomplete : true}).countDocuments().then(
        completecount =>{
            completedtasks = completecount
        }
    )
    await Task.find({iscomplete : false}).countDocuments().then(
        completecount =>{
            pendingtasks = completecount
        }
    )
    res.json({
        status : 200,
        success : true,
        total_employee : totalemployee,
        total_task : totaltask,
        total_projects : totalproject,
        total_category : totalcategory,
        total_team : totalteam,
        total_enquiry : totalenquiry,
        total_developer : totaldeveloper,
        highpriority : totalhighpriority,
        mediumpriority : totalmediumpriority,
        totaldesigner : totaldesigner,
        totaltester : totaltester,
        totalmaintenance : totalmaintenance,
        completedtasks : completedtasks,
        pendingtasks : pendingtasks
    })
}

userDashboard =  async (req,res) =>{
    employee = 0
    project_leader = 0
    var validate = ""
    if(req.body.employeeId == ""){
        validate+="Employee id is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        await Task.find({employeeId : req.body.employeeId}).countDocuments().then(
            employeecount =>{
                employee = employeecount
            }
        )
        await Project.find({project_leader : req.body.employeeId}).countDocuments().then(
            count=>{
                project_leader =count
            }
        )

        res.json({
            status : 200,
            success : true,
            employee : employee,
            project : project_leader
        })
    }
}

module.exports = {
    dashboard,
    userDashboard
}