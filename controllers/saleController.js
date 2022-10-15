const Sale = require("../models/saleSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const Customer = require("../models/customerSchema");

//create Sale

exports.createSale = async (req, res, next) => {
  //console.log("data", req.body);
  const sale = await Sale.create(req.body);
  const customer = await Customer.findById(req.body.customer_id)
  const balance = customer.balance + req.body.Total
  await Customer.findByIdAndUpdate(req.body.customer_id, {balance:balance}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: true,
    sale,
  });
};

exports.getAllSale = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const salesCount = await Sale.countDocuments();
  const Apifeature = new ApiFeatures(Sale.find(), req.query)
    .searchCustomer()
    .pagination(resultPerPage);
  const sale = await Apifeature.query;
  res.status(200).json({ success: true, sale, no_of_sales: salesCount });
});
exports.getAllSalebyDate = catchAsyncError(async (req, res) => {
  const allsale = await Sale.find();
  const startdate = new Date(req.body.startdate)
  const enddate = new Date(req.body.enddate)
  console.log({startdate})
  let sales = []
  allsale.map((item, index)=>{
      if(item.date_of_invoice >= startdate &&  item.date_of_invoice <= enddate){
      sales.push(item)
      }
  })
  res.status(200).json({ success: true, sales });
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
