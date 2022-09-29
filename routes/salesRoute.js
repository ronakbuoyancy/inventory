const express = require("express");
const { getAllSales, createSales, updateSales, deleteSales, getSalesDetails } = require("../controllers/salesController");

const router = express.Router();

router.route("/sales").get(getAllSales);
router.route("/sales/new").post(createSales);
router.route("/sales/:id").put(updateSales).delete(deleteSales).get(getSalesDetails);

module.exports = router