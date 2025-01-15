const axios = require("axios");
const {
  MatchupModel,
  MatchupDataModel,
} = require("../../../models/MatchupModel");
const HeroModel = require("../../../models/Heroes");

function populateMatchData() {
  HeroModel.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      result.forEach((element) => {
        // console.log(element.id);
        MatchupModel.find({ heroId: element.id }, (err, result) => {
          if (err) {
            console.log(err);
          } else if (result.length !== 0) {
            //Check if the record is already created to avoid duplication
            console.log("record already exist");
          } else {
            console.log("Create new record by heroid: " + element.id);
            //Limit the number of APi call to not crash server
            // if (element.id < 5) {

            axios
              .get(`https://api.opendota.com/api/heroes/${element.id}/matchups`)
              .then((response) => {
                console.log(response.status);

                //First: create instance based on MatchupModel
                const newMatchData = new MatchupModel({
                  heroId: element.id,
                });

                //To store each matchup played data for each hero, use push to sub-schema'
                //https://www.youtube.com/watch?v=kjKR0q8EBKE&list=LL&index=1
                response.data.forEach((data) => {
                  newMatchData.matchupData.push({
                    opponentID: data.hero_id,
                    gamesPlayed: data.games_played,
                    wins: data.wins,
                    winRatio: Math.round((data.wins / data.games_played) * 100),
                  });
                });

                newMatchData.save((err, data) => {
                  if (err) {
                    console.log(err.message);
                  } else {
                    console.log(data);
                  }
                });
              })
              .catch((error) => {
                console.log(error.message);
              });
            // }
          }
        });
      });
    }
  });
}

module.exports = { populateMatchData };
