const Contact = require('../models/contactmodel')

function addcontact(req,res){
    var validate = ""
    if(req.body.name == ""){
        validate+="Employee name and email is reqd \n"
    }
    if(req.body.email == "" ){
        validate+="Email is reqd \n"
    }
    if(req.body.description == "" ){
        validate+="Description is reqd \n"
    }
    if(req.body.subject == "" ){
        validate+="Subject is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        let contactObj = new Contact()
        contactObj.name = req.body.name
        contactObj.email = req.body.email
        contactObj.description = req.body.description
        contactObj.subject = req.body.subject
        contactObj.save()
        res.json({
            status : 200,
            success : true,
            msg : 'Enquiry/Reply send'
        })
    }
}


function getallContact(req,res){
    Contact.find(req.body).then(
        data=>{
            res.json({
                status : 200,
                success : true,
                msg : 'Data Retrieved',
                data : data
            })
        }
    ).catch(
        err=>{
            res.json({
                status : 404,
                success : false,
                msg : 'data not found',
                error : String(err)
            })
        }
    )
}

module.exports = {
    addcontact,
    getallContact
}