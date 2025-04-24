const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI


let isConnected = false;

async function dbConnect() {
  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      dbName: "Movie-Finder",
    });

    isConnected = true;
    console.log("Mongoose подключен к базе данных");
  } catch (error) {
    console.error("Ошибка подключения к MongoDB:", error.message);
  }
}

module.exports = dbConnect;