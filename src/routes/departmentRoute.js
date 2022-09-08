const express = require("express");
var router = express.Router();

const {
  viewDepartment,
  addDepartment,
  updateDepartment,
  salesAnalyze,
} = require("../controllers/departmentController");

router.get("/department/viewDepartment", viewDepartment);
router.post("/department/addDepartment", addDepartment);
router.put("/department/updateDepartment", updateDepartment);
router.get("/department/salesAnalyze", salesAnalyze);

module.exports = router;
