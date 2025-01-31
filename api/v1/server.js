require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

const mongoose = require("mongoose");
const HeroModel = require("../../models/Heroes");
const { MatchupModel, MatchupDataModel } = require("../../models/MatchupModel");

// If querySrv EREFUSED  Happens, change network IPv4 Tp to 8.8.8.8 and 8.8.0.0
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@m0-cluster-shard-00-00.dwmnj.mongodb.net:27017,m0-cluster-shard-00-01.dwmnj.mongodb.net:27017,m0-cluster-shard-00-02.dwmnj.mongodb.net:27017/?ssl=true&replicaSet=atlas-78iagd-shard-0&authSource=admin&retryWrites=true&w=majority&appName=M0-Cluster`;

mongoose.set("strictQuery", false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Express on Vercel"));

//Get all hero index
app.get("/hero-index", (req, res) => {
  HeroModel.find((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//search for matchup data of a certain hero heroId : NUMBER
app.get("/hero-data/search", (req, res) => {
  let searchID = req.query.heroId;
  MatchupModel.find({ heroId: searchID }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //return an array of sorted matchplayed data
      res.json(
        result[0].matchupData.sort(
          (firstItem, secondItem) => secondItem.winRatio - firstItem.winRatio
        )
      );
    }
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is up on port ${process.env.PORT}`);
});
