const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const Department = mongoose.model("Department");
const config = require("../../config");
var jwt = require("jsonwebtoken");

async function viewEmployee(req, res) {
  docs = await Employee.find().populate("departmentId").populate("roleId");
  res.json({ message: docs });
}

async function addEmployee(req, res) {
  try {
    let data = req.body;

    if (!data.phone || !data.email) {
      res.json({ meassage: "Parameters are missing" });
    } else {
      let emp1 = await Employee.findOne({ phone: data.phone });
      let emp2 = await Employee.findOne({ email: data.email });

      if (emp1) {
        res.json({ message: "Duplicate Phone number" });
      } else if (emp2) {
        res.json({ message: "Duplicate email" });
      } else {
        var emp = new Employee();
        emp.name = data.name;
        emp.phone = data.phone;
        emp.email = data.email;
        emp.password = data.password;
        emp.departmentId = data.departmentId;
        emp.roleId = data.roleId;
        await emp.save();
        res
          .status(200)
          .json({ status: true, msg: "Employee details added successfully" });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function updateEmployee(req, res) {
  console.log("body: ", req.body);
  try {
    let data = req.body;
    await Employee.findOneAndUpdate({ email: data.email }, data, { new: true });
    res
      .status(200)
      .json({ status: true, msg: "Employee details updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function findEmployee(req, res) {
  try {
    console.log("body: ", req.body);
    let empEmail = req.body?.email;
    let employee = await Employee.findOne({ email: empEmail })
      .populate("roleId")
      .populate("departmentId");
    if (employee && employee.roleId[0].roleId == 1) {
      let data = await Employee.find()
        .populate("roleId")
        .populate("departmentId");
      res.json(data);
    } else if (employee.roleId[0].roleId == 2) {
      res.json(employee);
    } else {
      res.json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function deleteEmployee(req, res) {
  console.log("body: ", req.body);
  try {
    await Employee.findOneAndDelete({
      email: req.body.email,
    });
    res
      .status(200)
      .json({ status: true, msg: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function employeeLogin(req, res) {
  try {
    let data = req.body;
    let empLogin = await Employee.findOne({
      email: data.email,
    });
    if (!empLogin) {
      res.json("Invalid email");
    } else {
      let empPassword = data.password;
      if (empLogin.password == empPassword) {
        var token = jwt.sign({ employee: empLogin }, config.secret);
      }
      if (token) {
        res.json({ jwt: token });
      } else {
        res.json("Invalid Password!");
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function tokenValidation(req, res, next) {
  try {
    let jwtSecretKey = config.secret;
    const authHeader = req.headers["authorization"];
    if (typeof authHeader !== "undefined" || authHeader !== null) {
      const token = authHeader && authHeader.split(" ")[1];
      jwt.verify(token, jwtSecretKey);
      next();
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

module.exports = {
  viewEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  findEmployee,
  employeeLogin,
  tokenValidation,
};
