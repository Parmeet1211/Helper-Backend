const Enquiry = require('../models/enquirymodel')

function addenquiry(req,res){
    var validate = ""
    if(req.body.empId == ""){
        validate+="Employee name and email is reqd \n"
    }
    if(req.body.description == "" ){
        validate+="Description is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        let enquiryObj = new Enquiry()
        enquiryObj.enqNo = req.body.enqNo
        enquiryObj.empId = req.body.empId
        enquiryObj.description = req.body.description
        enquiryObj.subject = req.body.subject
        enquiryObj.save()
        res.json({
            status : 200,
            success : true,
            msg : 'Enquiry/Reply send'
        })
    }
}

function getallenquiry (req,res){
    Enquiry.find(req.body).populate('empId').exec().then(
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

function singleEnquiry (req,res){
    var validate = ""
    if(req.body.empId == "")
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
        Enquiry.findOne({empId : req.body.empId}).populate('empId').then(
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


function updateEnquiry(req,res){
    var validate = ""
    if(req.body.empId == ""){
        validate+="Employee name and email is reqd \n"
    }
    if(req.body.description == "" ){
        validate+="Description is reqd \n"
    }
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
        Enquiry.findOne({_id : req.body._id}).then(
            data=>{
                if(data == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Data not found'
                    })
                }
                else{
                    data.enqNo = req.body.enqNo
                    data.empId = req.body.empId
                    data.description = req.body.description
                    data.subject = req.body.subject
                    data.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Data updated'
                    })
                }
            }
        )
    }
}

function reply(req,res){
    var validate = ""
    if(req.body._id == ""){
        validate+="Id is reqd \n"
    }
    if(req.body.reply == ""){
        validate+="Reply is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Enquiry.findOne({_id : req.body._id}).then(
            data=>{
                if(data){
                    data.reply = req.body.reply
                    data.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Reply added'
                    })
                }
                else{
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Reply not added'
                    })
                }
            }
        )
    }
}
module.exports = {
    addenquiry,
    getallenquiry,
    singleEnquiry,
    updateEnquiry,
    reply
}