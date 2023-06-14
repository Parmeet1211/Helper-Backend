const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const saltround = 10

exports.adminseeder = (req,res)=>{
    User.findOne({email : "admin@gmail.com"}).then(
        data=>{
            if(data == null){
                let userObj = new User()
                userObj.email = "admin@gmail.com"
                userObj.employee_name = "Admin"
                userObj.password = bcrypt.hashSync("123",saltround)
                userObj.userType = 1
                userObj.save()
                console.log('Admin inserted')
            }
            else{
                console.log('Admin already exists')
            }
        }
    )
}