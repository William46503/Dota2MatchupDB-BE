const mongoose = require("mongoose");

const MatchplayedSchema = new mongoose.Schema({
  opponentID: {
    type: Number,
  },
  gamesPlayed: {
    type: Number,
  },
  wins: {
    type: Number,
  },
  winRatio: Number,
});

const MatchupSchema = new mongoose.Schema({
  heroId: {
    type: Number,
  },
  matchupData: [MatchplayedSchema],
});

MatchupSchema.methods.getWinRatio = function () {
  console.log(this.wins / this.gamesPlayed);
  return this.wins / this.gamesPlayed;
};

// const MatchplayedModel = mongoose.model(
//   "matchplayedData",
//   matchplayedSchema,
//   "matchplayeddatas"
// );
const MatchupModel = mongoose.model(
  "matchupData",
  MatchupSchema,
  "matchupData"
);

const MatchupDataModel = mongoose.model("matchPlayedData", MatchplayedSchema);

module.exports = {
  MatchupModel,
  MatchupDataModel,
};

// const newtestData = new MatchupModel({
//   heroId: 1,

//   matchupData: [
//     { opponentID: 2, gamesPlayed: 100, wins: 29 },
//     { opponentID: 5, gamesPlayed: 400, wins: 124 },
//   ],
// });

// newtestData.save((err, data) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(data);
//   }
// });
