const routes = require("express").Router();
const multer = require("multer");
const categoryController = require("../controllers/categoryController");
const employeeController = require("../controllers/employeeController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const enquiryController = require("../controllers/enquiryController");
const teamController = require("../controllers/teamController");
const contactController = require("../controllers/contactController");
const dashboardController = require("../controllers/dashbordController");
const userController = require("../controllers/userController");

const employeestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/employee");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(uniqueSuffix + file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const employeeupload = multer({ storage: employeestorage });

// add contact us
routes.post("/addcontact", contactController.addcontact);

// login route
routes.post("/login", userController.login);

routes.use(require("../config/middleware")); //after this all the routes have to pass token in their header

// Category routes start
routes.post("/addcategory", categoryController.addCategory);
routes.post("/allcategory", categoryController.getallCategory);
routes.post("/singlecategory", categoryController.singleCategory);
routes.post("/updatecategory", categoryController.updateCategory);
// category_routes end

// employee routes start
routes.post(
  "/addemployee",
  employeeupload.single("image"),
  employeeController.addEmployee
);
routes.post("/allemployee", employeeController.getallemployee);
routes.post("/singleemployee", employeeController.singleEmployee);
routes.post(
  "/updateemployee",
  employeeupload.single("image"),
  employeeController.updateEmployee
);
routes.post(
  "/updateprofile",
  employeeupload.single("image"),
  employeeController.updateProfile
);
// employee routes end

// project routes start
routes.post("/addproject", projectController.addProject);
routes.post("/allproject", projectController.getallproject);
routes.post("/singleproject", projectController.singleProject);
routes.post("/updateproject", projectController.updateProject);
// project routes ends

// task route start
routes.post("/addtask", taskController.addtask);
routes.post("/alltask", taskController.alltasks);
routes.post("/singletask", taskController.singleTask);
routes.post("/updatetask", taskController.updateTask);
routes.post("/addprogress", taskController.addprogress);
routes.post("/gettaskprogress", taskController.getTasks);
routes.post("/getnewTasks", taskController.getnewTasks);
routes.post("/getrunningTasks", taskController.getrunningTasks);
routes.post("/getcompleteTasks", taskController.getcompleteTasks);
// task route end

// enquiry route start
routes.post("/addenquiry", enquiryController.addenquiry);
routes.post("/allenquiry", enquiryController.getallenquiry);
routes.post("/singleenquiry", enquiryController.singleEnquiry);
routes.post("/updateenquiry", enquiryController.updateEnquiry);
routes.post("/reply",enquiryController.reply)
// enquiry route end

// team route start
routes.post("/addteam", teamController.addTeam);
routes.post("/allteam", teamController.allteams);
routes.post("/singleteam", teamController.singleTeam);
routes.post("/updateteam", teamController.updateTeam);
// team route end

// contact route start
// routes.post('/addcontact',contactController.addcontact)
routes.post("/allcontact", contactController.getallContact);
// contact route end

// dashboard route start
routes.post("/dashboard", dashboardController.dashboard);
routes.post("/userdashboard",dashboardController.userDashboard)
// dashboard route end

// user route start
routes.post("/changepassword", userController.updatePassword);
// user route end

module.exports = routes;
