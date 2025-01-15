require("dotenv").config();
const mongoose = require("mongoose");

const { populateHeroModel } = require("./fetchHeroData");
const { populateMatchData } = require("./fetchMatchData");

function runFetchData() {
  const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@m0-cluster-shard-00-00.dwmnj.mongodb.net:27017,m0-cluster-shard-00-01.dwmnj.mongodb.net:27017,m0-cluster-shard-00-02.dwmnj.mongodb.net:27017/?ssl=true&replicaSet=atlas-78iagd-shard-0&authSource=admin&retryWrites=true&w=majority&appName=M0-Cluster`;

  mongoose
    .connect(uri)
    .then(() => {
      console.log("connected");
      populateHeroModel();
      populateMatchData();
    })
    .catch((e) => console.log(e));
}

runFetchData();
