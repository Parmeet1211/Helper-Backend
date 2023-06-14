const express = require("express");
const config = require("./config/db");
const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const adminroutes = require("./routes/adminroutes");
app.use("/admin", adminroutes);

app.all("*", (req, res) => {
  res.json({
    status: 404,
    success: false,
    msg: "route not found",
  });
});

const seeder = require("./config/seeder");
seeder.adminseeder();
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
