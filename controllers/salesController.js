const Sales = require("../models/salesSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

//create Sales

exports.createSales = async (req, res, next) => {
  //console.log("data", req.body);
  const sales = await Sales.create(req.body);
  res.status(201).json({
    success: true,
    sales,
  });
};

exports.getAllSales = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const pageCount = Math.ceil(await Sales.countDocuments()/resultPerPage);
  const Apifeature = new ApiFeatures(Sales.find(), req.query)
    .searchCustomer()
    .pagination(resultPerPage);
  const sales = await Apifeature.query;
  res.status(200).json({ success: true, sales, Totalpages: pageCount });
});

exports.getSalesDetails = catchAsyncError(async (req, res, next) => {
  let sales = await Sales.findById(req.params.id);

  if (!sales) {
    return next(new ErrorHandler("Sales not Found", 404));
  }
  return res.status(200).json({
    success: true,
    sales,
  });
});

exports.updateSales = catchAsyncError(async (req, res, next) => {
  let sales = await Sales.findById(req.params.id);

  if (!sales) {
    return next(new ErrorHandler("Sales not Found", 404));
  }
  sales = await Sales.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    sales,
  });
});

exports.deleteSales = catchAsyncError(async (req, res, next) => {
  let sales = await Sales.findById(req.params.id);

  if (!sales) {
    return next(new ErrorHandler("Sales not Found", 404));
  }
  await sales.remove();
  res.status(200).json({
    success: true,
    message: "Sales deleted successfully",
  });
});
