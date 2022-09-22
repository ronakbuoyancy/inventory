const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//unhandle caught exception
process.on("uncaughtException", (err)=>{
    console.log("Err:", err.message)
    console.log("Server is down due to unhandle Exception");
    process.exit(1)
})
//config
dotenv.config({ path: "./config/config.env" });

//connect to database

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working fine on http://localhost:${process.env.PORT}`);
});

//Unhandle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log("Err:", err.message);
  console.log("Server is down due to unhandle Rejection");

  server.close(() => {
    process.exit(1);
  });
});
