const express = require("express")
const cors = require("cors");

const app = express();

const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cors());



// Route import

const product = require("./routes/productRoute");
const customer = require("./routes/customerRoute");

app.use("/api", product)
app.use("/api", customer)

app.use(errorMiddleware);


module.exports = app