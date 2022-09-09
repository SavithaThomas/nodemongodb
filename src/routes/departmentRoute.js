const express = require("express");
var router = express.Router();

const {
  viewDepartment,
  addDepartment,
  updateDepartment,
  salesAnalyze,
} = require("../controllers/departmentController");

const auth = require("../controllers/employeeController").tokenValidation;

router.get("/department/viewDepartment", auth, viewDepartment);
router.post("/department/addDepartment", addDepartment);
router.put("/department/updateDepartment", updateDepartment);
router.get("/department/salesAnalyze", salesAnalyze);

module.exports = router;
