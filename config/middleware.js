const jwt = require('jsonwebtoken')
const secretkey = "helper@2023"

module.exports = (req,res,next) =>{
    token = req.headers['authorization']
    jwt.verify(token,secretkey,(err,data)=>{
        if(err){
            res.json({
                status : 401,
                success : false,
                msg : 'Unauthorization'
            })
        }
        else{
            next()
        }
    })
}