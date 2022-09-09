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

router.get("/employee/viewEmployee", tokenValidation, viewEmployee);
router.get("/employee/findEmployee", tokenValidation, findEmployee);
router.get("/employee/deleteEmployee", tokenValidation, deleteEmployee);
router.post("/employee/addEmployee", tokenValidation, addEmployee);
router.put("/employee/updateEmployee", tokenValidation, updateEmployee);
router.get("/employee/employeeLogin", employeeLogin);

module.exports = router;
