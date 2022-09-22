const mongoose = require("mongoose");
const connectDatabase = () => {
    
    mongoose.connect("mongodb+srv://ronak:ronakmongo@cluster0.5lig2.mongodb.net/inventory?retryWrites=true&w=majority")
    .then(() => console.log("Connected..."))
}

module.exports = connectDatabase