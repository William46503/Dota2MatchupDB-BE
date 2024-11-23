require("dotenv").config();
const mongoose = require("mongoose");

const { populateHeroModel } = require("./fetchHeroData");
const { populateMatchData } = require("./fetchMatchData");

function runFetchData() {
  const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@m0-cluster.dwmnj.mongodb.net/?retryWrites=true&w=majority&appName=M0-Cluster`;

  mongoose
    .connect(url)
    .then(() => {
      console.log("connected");
      populateHeroModel();
      populateMatchData();
    })
    .catch((e) => console.log(e));

  setTimeout(() => {
    mongoose.connection.close();
  }, 60000);
  // setInterval(() => {}, 2629746000);
}

module.exports = { runFetchData };
