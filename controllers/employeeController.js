const Employee = require("../models/employeemodel");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const saltround = 10;

function addEmployee(req, res) {
  var validate = "";
  console.log(req.body);

  if (req.body.employee_name == "") {
    validate += "Employee Name is reqd \n";
  }
  if (req.body.employee_id == "") {
    validate += "Employee Id is reqd \n";
  }
  if (req.body.role == "") {
    // console.log(req.body.role)
    validate += "Role is reqd \n";
  }
  if (req.body.email == "") {
    validate += "Email is reqd \n";
  }
  if (req.body.password == "") {
    validate += "Password is reqd \n";
  }

  if (req.body.contact == "") {
    validate += "Contact No is reqd \n";
  }
  if (req.body.address == "") {
    validate += "Address is reqd \n";
  }
  if (req.body.image == "") {
    validate += "Image is reqd \n";
  }

  if (!!validate) {
    res.json({
      status: 409,
      success: false,
      msg: validate,
    });
  } else {
    User.findOne({ email: req.body.email }).then((userdata) => {
      if (userdata == null) {
        let userObject = new User();
        userObject.employee_name = req.body.employee_name;
        userObject.email = req.body.email;
        userObject.password = bcrypt.hashSync(req.body.password, saltround);
        userObject.save().then((data) => {
          if (data) {
            let empObject = new Employee();
            empObject.employee_name = req.body.employee_name;
            empObject.employee_id = req.body.employee_id;
            empObject.role = req.body.role;
            empObject.email = req.body.email;
            empObject.password = req.body.password;
            empObject.contact = req.body.contact;
            empObject.address = req.body.address;
            if (req.file) {
              empObject.image = "employee/" + req.file.filename;
            }
            empObject.userId = data._id;
            empObject.save();
            res.json({
              status: 200,
              success: true,
              msg: "Data inserted",
            });
          }
        });
      } else {
        res.json({
          status: 409,
          success: false,
          msg: "email already exists",
        });
      }
    });
  }
}

function getallemployee(req, res) {
  //   console.log(req.body);
  Employee.find(req.body)
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        success: true,
        msg: "data retrieved",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: true,
        msg: "Error in loading data",
        error: String(err),
      });
    });
}

function singleEmployee(req, res) {
  var validate = "";
  if (req.body._id == "") {
    validate += "Id is required \n";
  }
  if (!!validate) {
    res.json({
      status: 409,
      success: false,
      msg: validate,
    });
  } else {
    Employee.findOne({ _id: req.body._id }).then((data) => {
      res.json({
        status: 200,
        success: true,
        msg: "data retrived",
        data: data,
      });
    });
  }
}

function updateEmployee(req, res) {
  var validate = "";
  if (req.body.employee_name == "") {
    validate += "Employee Name is reqd \n";
  }
  if (req.body.employee_id == "") {
    validate += "Employee Id is reqd \n";
  }
  if (req.body.role == "") {
    validate += "Role is reqd \n";
  }
  if (req.body.email == "") {
    validate += "Email is reqd \n";
  }

  if (req.body._id == "") {
    validate += "Id is reqd \n";
  }
  if (req.body.contact == "") {
    validate += "Contact No is reqd \n";
  }
  if (req.body.address == "") {
    validate += "Address is reqd \n";
  }
  if (req.body.image == "") {
    validate += "Image is reqd \n";
  }
  if (!!validate) {
    res.json({
      status: 409,
      success: false,
      msg: validate,
    });
  } else {
    Employee.findOne({ _id: req.body._id }).then((data) => {
      if (data == null) {
        res.json({
          status: 409,
          success: false,
          msg: "Data not updated",
        });
      } else {
        User.findOne({ _id: data.userId }).then((userdata) => {
          if (userdata == null) {
            res.json({
              status: 409,
              success: false,
              msg: "Data not update",
            });
          } else {
            userdata.email = req.body.email;
            userdata.employee_name = req.body.employee_name;
            userdata.save().then((udata) => {
              // data.employee_name = req.body.employee_name
              data.employee_id = req.body.employee_id;
              data.role = req.body.role;
              // data.email = req.body.email
              data.contact = req.body.contact;
              data.address = req.body.address;
              if (req.file) {
                data.image = "employee/" + req.file.filename;
              }
              data.save();
              res.json({
                status: 200,
                success: true,
                msg: "Data inserted",
              });
            });
          }
        });
      }
    });
  }
}


function updateProfile(req,res){
  var validate=""
  if(req.body._id == ""){
    validate+="Id is reqd"
  }
  if(req.body.address == ""){
    validate+="Address is reqd"
  }
  if(req.body.contact == ""){
    validate+="Contact  is reqd"
  }
  if(!!validate){
    res.json({
      status : 409,
      success :false,
      msg : validate
    })
  }
  else{
    Employee.findOne({_id : req.body._id}).then(
      data=>{
        if(data){
          data.contact = req.body.contact;
          data.address = req.body.address;
          if (req.file) {
            data.image = "employee/" + req.file.filename;
          }
          data.save();
          res.json({
            status: 200,
            success: true,
            msg: "Data inserted",
          });
        }
        else{
          res.json({
            status: 409,
            success: false,
            msg: "User not found",
          });
        }
      }
    )
  }
}

module.exports = {
  addEmployee,
  getallemployee,
  singleEmployee,
  updateEmployee,
  updateProfile
};
