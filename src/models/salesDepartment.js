const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productQuantity: {
    type: Number,
  },
});
module.exports = mongoose.model("Sales", salesSchema);
