const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.once("disconnected", () => {
      console.log("Mongoose disconnected from DB");
      // Try to reconnect
      if (mongoose.connection.readyState === 0) {
        mongoose.connect(process.env.DB_CONNECTION_URL);
      }
    });
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
