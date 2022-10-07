const express = require("express");

const {createCustomer, getAllCustomer, getAllCustomers, updateCustomer, deleteCustomer, getCustomerDetails} = require("../controllers/customerController");

const router = express.Router();

router.route("/customers").get(getAllCustomer);
router.route("/customers/all").get(getAllCustomers);
router.route("/customer/new").post(createCustomer);
router.route("/customer/:id").put(updateCustomer).delete(deleteCustomer).get(getCustomerDetails);

module.exports = router