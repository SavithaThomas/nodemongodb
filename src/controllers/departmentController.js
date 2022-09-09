const mongoose = require("mongoose");
const Department = mongoose.model("Department");
const Sales = mongoose.model("Sales");
const config = require("../../config");

async function viewDepartment(req, res) {
  docs = await Department.find();
  res.json({ message: docs });
}

async function addDepartment(req, res) {
  try {
    let data = req.body;

    if (!data.departmentId || !data.departmentName) {
      res.json({ meassage: "Parameters are missing" });
    } else {
      let dept1 = await Department.findOne({
        departmentId: data.departmentId,
      });
      let dept2 = await Department.findOne({
        departmentName: data.departmentName,
      });

      if (dept1) {
        console.log(dept1);
        res.json({ message: "Duplicate Department Id" });
      } else if (dept2) {
        res.json({ message: "Duplicate Department name" });
      } else {
        var dept = new Department();
        dept.departmentId = data.departmentId;
        dept.departmentName = data.departmentName;
        await dept.save();

        res
          .status(200)
          .json({ status: true, msg: "Department details added successfully" });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function updateDepartment(req, res) {
  console.log("body: ", req.body);
  try {
    let data = req.body;
    await Department.findOneAndUpdate(
      { departmentId: data.departmentId },
      data,
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, msg: "Department details updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function salesAnalyze(req, res) {
  try {
    let data = req.body;
    var query = await Sales.find();
    let gteOperation = await Sales.find({ productquantity: { $gte: 30 } });
    let orOperation = await Sales.find({
      $or: [{ productQuantity: { $gt: 30 } }, { productPrice: { $gte: 30 } }],
    });
    let andOperation = await Sales.find({
      $and: [{ productQuantity: { $gt: 30 } }, { productPrice: { $gte: 30 } }],
    });
    let maxPrice = await Sales.findOne().sort({ productPrice: -1 });
    let minPrice = await Sales.findOne().sort({ productPrice: +1 });

    let count = await Sales.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$productQuantity",
          },
        },
      },
    ]);

    let message = {
      "GTE Operation": gteOperation,
      "Or Operation": orOperation,
      "And Operation": andOperation,
      "Maximum Price": maxPrice,
      "Minimum Price": minPrice,
      "Product Count": count,
    };
    res.status(200).json({ msg: message });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

module.exports = {
  viewDepartment,
  addDepartment,
  updateDepartment,
  salesAnalyze,
};
