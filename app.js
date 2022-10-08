const express = require("express")
const cors = require("cors");

const app = express();

const errorMiddleware = require("./middleware/error")

app.use(express.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Route import

const product = require("./routes/productRoute");
const customer = require("./routes/customerRoute");
const sale = require("./routes/saleRoute");
const purchase = require("./routes/purchaseRoute");
const payment = require("./routes/paymentRoute");

app.use("/api", product)
app.use("/api", customer)
app.use("/api", sale)
app.use("/api", purchase)
app.use("/api", payment)



app.use(errorMiddleware);


module.exports = app