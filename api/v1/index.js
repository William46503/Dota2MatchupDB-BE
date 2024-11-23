require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

const mongoose = require("mongoose");
const HeroModel = require("../../models/Heroes");
const { MatchupModel, MatchupDataModel } = require("../../models/MatchupModel");
const { runFetchData } = require("../../fetchData");

// If querySrv EREFUSED  Happens, change network IPv4 Tp to 8.8.8.8 and 8.8.0.0
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.khg9ypc.mongodb.net/Dota2App?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .catch((err) => console.log(err));

setTimeout(() => {
  runFetchData();
}, 2629746000);

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

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is up`);
});
