const express = require("express");
var router = express.Router();

const {
  viewDepartment,
  addDepartment,
  updateDepartment,
  addSales,
  salesAnalyze,
} = require("../controllers/departmentController");

const auth = require("../controllers/employeeController").tokenValidation;

router.get("/department/viewDepartment", auth, viewDepartment);
router.post("/department/addDepartment", auth, addDepartment);
router.put("/department/updateDepartment", auth, updateDepartment);
router.post("/department/addSales", auth, addSales);
router.get("/department/salesAnalyze", auth, salesAnalyze);

module.exports = router;
