const Task = require("../models/taskmodel");

function addtask(req, res) {
  var validate = "";
  if (req.body.taskname == "") {
    validate += "Task name is reqd \n";
  }
  if (req.body.employeeId == "") {
    validate += "Employee name is reqd \n";
  }
  if (req.body.description == "") {
    validate += "Description is reqd \n";
  }
  if (req.body.priority == "") {
    validate += "Priority is reqd \n";
  }
  if (req.body.projectId == "") {
    validate += "Project name is reqd \n";
  }
  if (req.body.categoryId == "") {
    validate += "Category name is reqd \n";
  }
  if (req.body.lastDate == "") {
    validate += "Last Date is reqd";
  }
  if (!!validate) {
    res.json({
      status: 409,
      success: false,
      msg: validate,
    });
  } else {
    Task.findOne({ taskname: req.body.taskname }).then((data) => {
      if (data == null) {
        let taskobj = new Task();
        taskobj.taskname = req.body.taskname;
        taskobj.employeeId = req.body.employeeId;
        taskobj.description = req.body.description;
        taskobj.priority = req.body.priority;
        taskobj.projectId = req.body.projectId;
        taskobj.categoryId = req.body.categoryId;
        taskobj.lastDate = req.body.lastDate;
        taskobj.save();
        res.json({
          status: 200,
          success: true,
          msg: "Data inserted",
        });
      } else {
        res.json({
          status: 409,
          success: false,
          msg: "Task already exists",
        });
      }
    });
  }
}

function alltasks(req, res) {
  Task.find(req.body)
    .populate("projectId")
    .populate("employeeId")
    .populate("categoryId")
    .then((data) => {
      if (data == null) {
        res.json({
          status: 409,
          success: false,
          msg: "Data not found",
        });
      } else {
        res.json({
          status: 200,
          success: true,
          msg: "Data retrived",
          data: data,
        });
      }
    });
}

function singleTask(req, res) {
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
    Task.findOne({ _id: req.body._id })
      .populate("projectId")
      .populate("employeeId")
      .populate("categoryId")
      .then((data) => {
        res.json({
          status: 200,
          success: true,
          msg: "data retrived",
          data: data,
        });
      });
  }
}

function updateTask(req, res) {
  var validate = "";
  if (req.body.taskname == "") {
    validate += "Task name is reqd \n";
  }
  if (req.body.employeeId == "") {
    validate += "Employee name is reqd \n";
  }
  if (req.body.description == "") {
    validate += "Description is reqd \n";
  }
  if (req.body.priority == "") {
    validate += "Priority is reqd \n";
  }
  if (req.body.projectId == "") {
    validate += "Project name is reqd \n";
  }
  if (req.body.categoryId == "") {
    validate += "Category name is reqd \n";
  }
  if (req.body.lastDate == "") {
    validate += "Last Date is reqd \n";
  }
  if (req.body.iscomplete == "") {
    validate += "Complete status is reqd \n";
  }
  if (req.body._id == "") {
    validate += "Id is reqd";
  }
  if (!!validate) {
    res.json({
      status: 409,
      success: false,
      msg: validate,
    });
  } else {
    Task.findOne({ _id: req.body._id }).then((data) => {
      console.log(data);
      if (data == null) {
        res.json({
          status: 409,
          success: false,
          msg: "Data not found",
        });
      } else {
        data.taskname = req.body.taskname;
        data.employeeId = req.body.employeeId;
        data.description = req.body.description;
        data.priority = req.body.priority;
        data.projectId = req.body.projectId;
        data.categoryId = req.body.categoryId;
        data.lastDate = req.body.lastDate;
        data.iscomplete = req.body.iscomplete;
        data.save();
        res.json({
          status: 200,
          success: true,
          msg: "data  updated",
        });
      }
    });
  }
}

function addprogress(req, res) {
  var validate = "";
  if (req.body.progress == "") {
    validate += "Progress is reqd \n";
  }
  if (req.body._id == "") {
    validate += "Id is reqd \n";
  }
  if (!!validate) {
    res.json({
      status: 409,
      succes: false,
      msg: validate,
    });
  } else {
    Task.findOne({ _id: req.body._id }).then((data) => {
      if (data == null) {
        res.json({
          status: 409,
          success: false,
          msg: "Task not found",
        });
      } else {
        data.progress = req.body.progress;
        data.save();
        res.json({
          status: 200,
          success: true,
          msg: "Progress added",
        });
      }
    });
  }
}

function getTasks(req, res) {
  Task.find({ progress: 0 }).then((data) => {
    if (data) {
      res.json({
        status: 200,
        success: true,
        msg: "Data retrieved",
        data: data,
      });
    } else {
      res.json({
        status: 409,
        success: false,
        msg: "Data not found",
      });
    }
  });
}

function getnewTasks(req, res) {
  let finder = { $and: [{ progress: { $lt: 1 } }, { iscomplete: false }] };
  console.log(finder);
  Task.find(finder).populate('employeeId').populate('projectId').then((data) => {
    if (data) {
      res.json({
        status: 200,
        success: true,
        msg: "Data retrieved",
        data: data,
      });
    } else {
      res.json({
        status: 409,
        success: false,
        msg: "Data not found",
      });
    }
  });
}

function getrunningTasks(req, res) {
  let finder = {
    $and: [
      { progress: { $gt: 1 } },
      { progress: { $lt: 100 } },
      { iscomplete: false },
    ],
  };
  //   console.log(finder);
  Task.find(finder).populate('employeeId').populate('projectId').then((data) => {
    if (data) {
      res.json({
        status: 200,
        success: true,
        msg: "Data retrieved",
        data: data,
      });
    } else {
      res.json({
        status: 409,
        success: false,
        msg: "Data not found",
      });
    }
  });
}

function getcompleteTasks(req, res) {
  let finder = {
    $and: [{ progress: 100 }, { iscomplete: true }],
  };
  //   console.log(finder);
  Task.find(finder).populate('employeeId').populate('projectId').then((data) => {
    if (data) {
      res.json({
        status: 200,
        success: true,
        msg: "Data retrieved",
        data: data,
      });
    } else {
      res.json({
        status: 409,
        success: false,
        msg: "Data not found",
      });
    }
  });
}

module.exports = {
  addtask,
  alltasks,
  singleTask,
  updateTask,
  addprogress,
  getTasks,
  getnewTasks,
  getrunningTasks,
  getcompleteTasks,
};
