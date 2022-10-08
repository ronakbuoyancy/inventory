const express = require("express");

const {createPayment, getPaymentsByCustomer, updatePayment, deletePayment, getPaymentDetails} = require("../controllers/PaymentController");

const router = express.Router();

router.route("/payment/:customer_id").get(getPaymentsByCustomer);
router.route("/payment/new").post(createPayment);
router.route("/payment/:id").put(updatePayment).delete(deletePayment).get(getPaymentDetails);

module.exports = router