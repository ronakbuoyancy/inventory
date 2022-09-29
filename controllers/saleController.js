const Sale = require("../models/saleSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

//create Sale

exports.createSale = async (req, res, next) => {
  //console.log("data", req.body);
  const sale = await Sale.create(req.body);
  res.status(201).json({
    success: true,
    sale,
  });
};

exports.getAllSale = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const pageCount = Math.ceil(await Sale.countDocuments()/resultPerPage);
  const Apifeature = new ApiFeatures(Sale.find(), req.query)
    .searchCustomer()
    .pagination(resultPerPage);
  const sale = await Apifeature.query;
  res.status(200).json({ success: true, sale, Totalpages: pageCount });
});

exports.getSaleDetails = catchAsyncError(async (req, res, next) => {
  let sale = await Sale.findById(req.params.id);

  if (!sale) {
    return next(new ErrorHandler("Sale not Found", 404));
  }
  return res.status(200).json({
    success: true,
    sale,
  });
});

exports.updateSale = catchAsyncError(async (req, res, next) => {
  let sale = await Sale.findById(req.params.id);

  if (!sale) {
    return next(new ErrorHandler("Sale not Found", 404));
  }
  sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    sale,
  });
});

exports.deleteSale = catchAsyncError(async (req, res, next) => {
  let sale = await Sale.findById(req.params.id);

  if (!sale) {
    return next(new ErrorHandler("Sale not Found", 404));
  }
  await sale.remove();
  res.status(200).json({
    success: true,
    message: "Sale deleted successfully",
  });
});
