const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();
const dbConfig = process.env.MONGO_URL


// console.log("DB Config:", process.env.MONGO_URL);

const configure = () => {
  const connect = () => {
    mongoose.connect(dbConfig);
  };
  connect();

  const db = mongoose.connection;

  db.on("connected", () => {
    console.info("DB Connected");
  });

  db.on("error", (err) => {
    console.error("Mongoose default connection error: " + err);
  });

  db.on("disconnected", () => {
    console.info("Again going to connect DB");
    connect();
  });
};

module.exports = configure