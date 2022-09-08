const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleId: {
    type: String,
  },
  roleName: {
    type: String,
  },
});
module.exports = mongoose.model("RoleType", roleSchema);
