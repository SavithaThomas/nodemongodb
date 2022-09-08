require("./src/models/employeeModel");
require("./src/models/departmentModel");
require("./src/models/roleType");
require("./src/models/salesDepartment");
require("./src/database/db");

const express = require("express");
const bodyparser = require("body-parser");

const employee = require("./src/routes/employeeRoute");
const department = require("./src/routes/departmentRoute");

var app = express();
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.use(employee);
app.use(department);

app.listen(3000, () => {
  console.log("Express server started at port:3000");
});
