const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentId: {
    type: String,
  },
  departmentName: {
    type: String,
  },
});
module.exports = mongoose.model("Department", departmentSchema);
