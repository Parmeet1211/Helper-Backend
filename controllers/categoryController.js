const Category = require('../models/categorymodel')

function addCategory(req,res){
    var validate = ""
    if(req.body.category_name == ""){
        validate+="Category Name is required \n"
    }
    if(req.body.description == ""){
        validate+="Description is required \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Category.findOne({category_name : req.body.category_name}).then(
            data=>{
                if(data == null)
                {
                    let categoryObject = new Category()
                    categoryObject.category_name = req.body.category_name
                    categoryObject.description = req.body.description
                    categoryObject.save()
                    res.json({
                        status : 200,
                        success : true,
                        msg : 'Data Inserted',
                        data : categoryObject
                    })
                }
                else
                {
                    res.json(
                        {
                            status : 409,
                            success : false,
                            msg : 'Category already Exists'
                        }
                    )
                }
            }
        )
    }
}


function getallCategory(req,res){
    Category.find(req.body).then(
        categorydata=>{
            res.json({
                status : 200,
                success : true,
                msg : 'Data Retrieved',
                
                data : categorydata
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

function singleCategory(req,res){
    var validate = ""
    if(req.body._id == "")
    {
        validate+="ID is required \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Category.findOne({ _id : req.body._id}).then(
            categorydata=>{
                res.json({
                    status : 200,
                    success : true,
                    msg : "Data retrived successfully",
                    data : categorydata
                })
            }
        ).catch(
            err=>{
                res.json({
                    status : 404,
                    success : false,
                    msg : 'Data not found',
                    error : String(err)
                })
            }
        )
    }
}

function updateCategory(req,res){
    var validate = ""
    if(req.body.category_name == ""){
        validate+="Category Name is required \n"
    }
    if(req.body.description == ""){
        validate+="Description is required \n"
    }
    if(req.body._id == ""){
        validate+="ID is required \n"
    }
    if(!!validate){
        res.json({
            status : 409,
            success : false,
            msg : validate
        })
    }
    else{
        Category.findOne({ _id : req.body._id}).then(
            data=>{
                if(data){
                    data.category_name = req.body.category_name
                    data.description = req.body.description
                    data.save()
                    res.json({
                        status : 200,
                        success :true,
                        msg : 'record updated'
                    })
                    
                }
                else{
                    res.json({
                        status : 409,
                        success : false,
                        msg : 'Record not updated'
                    })
                }
            }
        ).catch(
            err=>{
                res.json({
                    status : 409,
                    success : false,
                    msg : 'Cannot update',
                    err : String(err)
                })
            }
        )
    }
}
module.exports = {
    addCategory,
    getallCategory,
    singleCategory,
    updateCategory
}