const express = require("express");

const {createCustomer, getAllCustomer, updateCustomer, deleteCustomer, getCustomerDetails} = require("../controllers/customerController");

const router = express.Router();

router.route("/products").get(getAllCustomer);
router.route("/customer/new").post(createCustomer);
router.route("/product/:id").put(updateCustomer).delete(deleteCustomer).get(getCustomerDetails);

module.exports = router