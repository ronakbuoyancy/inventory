const Product = require("../models/productSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

//create Product

exports.createProduct = async (req, res, next) => {
  console.log("data", req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//for all product without pagination
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const productCount = await Product.countDocuments();
  const products = await Product.find()
  res.status(200).json({ success: true, products, no_of_products: productCount });
});

exports.getAllProduct = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const Apifeature = new ApiFeatures(Product.find(), req.query)
    .searchProduct()
    .pagination(resultPerPage);
  const products = await Apifeature.query;
  res.status(200).json({ success: true, products, no_of_products: productCount });
});



exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
