const express = require("express");
var router = express.Router();

const {
  viewEmployee,
  findEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  employeeLogin,
  tokenValidation,
} = require("../controllers/employeeController");

router.get("/employee/viewEmployee", viewEmployee);
router.get("/employee/findEmployee", tokenValidation, findEmployee);
router.get("/employee/deleteEmployee", deleteEmployee);
router.post("/employee/addEmployee", addEmployee);
router.put("/employee/updateEmployee", updateEmployee);
router.get("/employee/employeeLogin", employeeLogin);

module.exports = router;
