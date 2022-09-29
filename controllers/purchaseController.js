const Purchase = require("../models/purchaseSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

//create Purchase

exports.createPurchase = async (req, res, next) => {
  //console.log("data", req.body);
  const purchase = await Purchase.create(req.body);
  res.status(201).json({
    success: true,
    purchase,
  });
};

exports.getAllPurchase = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const purchaseCount = await Purchase.countDocuments();
  const Apifeature = new ApiFeatures(Purchase.find(), req.query)
    .searchCustomer()
    .pagination(resultPerPage);
  const purchase = await Apifeature.query;
  res.status(200).json({ success: true, purchase, no_of_purchases: purchaseCount });
});

exports.getPurchaseDetails = catchAsyncError(async (req, res, next) => {
  let purchase = await Purchase.findById(req.params.id);

  if (!purchase) {
    return next(new ErrorHandler("Purchase not Found", 404));
  }
  return res.status(200).json({
    success: true,
    purchase,
  });
});

exports.updatePurchase = catchAsyncError(async (req, res, next) => {
  let purchase = await Purchase.findById(req.params.id);

  if (!purchase) {
    return next(new ErrorHandler("Purchase not Found", 404));
  }
  purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    purchase,
  });
});

exports.deletePurchase = catchAsyncError(async (req, res, next) => {
  let purchase = await Purchase.findById(req.params.id);

  if (!purchase) {
    return next(new ErrorHandler("Purchase not Found", 404));
  }
  await purchase.remove();
  res.status(200).json({
    success: true,
    message: "Purchase deleted successfully",
  });
});
