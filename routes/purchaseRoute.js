const express = require("express");
const { getAllPurchase, createPurchase, updatePurchase, deletePurchase, getPurchaseDetails } = require("../controllers/purchaseController");

const router = express.Router();

router.route("/purchases").get(getAllPurchase);
router.route("/purchase/new").post(createPurchase);
router.route("/purchase/:id").put(updatePurchase).delete(deletePurchase).get(getPurchaseDetails);

module.exports = router