const User = require('../models/usermodel')
const Employee = require('../models/employeemodel')
const bcrypt  = require('bcrypt')
const saltround = 10
const jwt = require('jsonwebtoken')
const secretkey = "helper@2023"


function updatePassword(req,res){

    //password is updating in user model only
    var validator = ""
    if(req.body.oldpassword == ""){
        validator+="Old password required"
    }
    if(req.body.newpassword == ""){
        validator+="New password required"
    }
    if(req.body.confirmpassword == ""){
        validator+="Confirm password required"
    }
    if(req.body.userId == ""){
        validator+="User id is required"
    }
    if(!!validator){
        res.json({
            status : 409,
            success : false,
            msg : validator
        })
    }
    else{
        // comparing newpassword with confirm password
        if(req.body.newpassword == req.body.confirmpassword){
            User.findOne({_id : req.body.userId}).then(
                userdata=>{
                    if(userdata==null)
                    {
                        res.json({
                            status:404,
                            success:false,
                            msg:'User not found'
                        })
                    }else{
                        console.log(req.body.oldpassword)
                        bcrypt.compare(req.body.oldpassword,userdata.password,(err,data)=>{
                            console.log(data)
                            if(data){
                                userdata.password = bcrypt.hashSync(req.body.newpassword,saltround)
                                userdata.save()
                                res.json({
                                    status : 200,
                                    success : true,
                                    msg : 'Password updated'
                                })
                            }
                            else{
                                res.json({
                                    status : 409,
                                    success : false,
                                    msg : 'Invalid old password'
                                })
                            }
                        })
                        
                    }
                }
            )
        }
        else{
            res.json({
                status : 409,
                success : false,
                msg : 'New password and confirm password not matched'
            })
        }
    }
}


function login(req,res){
    // validator
    var validate = ""
    if(req.body.email == ""){
        validate+="Email is reqd \n"
    }
    if(req.body.password == ""){
        validate+="Password is reqd \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        User.findOne({email : req.body.email}).then(
            userdata=>{
                if(userdata == null){
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'User not exists'
                    })
                }
                else{
                    bcrypt.compare(req.body.password,userdata.password,(err,data)=>{
                        if(err){
                            res.json({
                                status : 409,
                                success : false,
                                msg : 'Invalid Password'
                            })
                        }
                        else{
                            if(data)
                            {

                                payload={
                                    _id : userdata._id,
                                    name : userdata.name,
                                    email : userdata.email,
                                    userType : userdata.userType
                                }
    
                                token = jwt.sign(payload,secretkey)
                                res.json({
                                    status : 200,
                                    success : true,
                                    msg : 'Login successfully',
                                    token : token,
                                    _id : userdata._id,
                                    userType : userdata.userType  
                                })
                            }
                            else{
                                res.json({
                                    status : 409,
                                    success : false,
                                    msg : 'Invalid password',
                                })
                            }
                        }
                    })
                }
            }
        )
    }
}
module.exports = {
    updatePassword,
    login
}