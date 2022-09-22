const express = require("express")

const app = express();

const errorMiddleware = require("./middleware/error")

app.use(express.json());



// Route import

const product = require("./routes/productRoute");
const customer = require("./routes/customerRoute");

app.use("/api", product)
app.use("/api", customer)

app.use(errorMiddleware);


module.exports = app