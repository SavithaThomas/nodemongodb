const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  departmentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
  roleId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoleType",
    },
  ],
});
module.exports = mongoose.model("Employee", employeeSchema);
