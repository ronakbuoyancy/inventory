const express = require("express");
const { getAllSale, createSale, getAllSalebyDate, updateSale, deleteSale, getSaleDetails, getNextInvoice } = require("../controllers/saleController");

const router = express.Router();

router.route("/sales").get(getAllSale);
router.route("/sale/getnewinvoice").get(getNextInvoice);
router.route("/sale/new").post(createSale);
router.route("/sale/filter").post(getAllSalebyDate);
router.route("/sale/:id").put(updateSale).delete(deleteSale).get(getSaleDetails);
module.exports = router