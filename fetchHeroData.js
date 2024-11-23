const axios = require("axios");
const HeroModel = require("./models/Heroes");

function populateHeroModel() {
  const updatedHeroList = [];

  axios
    .get("https://api.opendota.com/api/heroes")
    .then(async function (response) {
      const fetchedHeroList = response.data;
      //Fetch newest data to update the herolist
      fetchedHeroList.forEach((item) => {
        updatedHeroList.push({
          id: item.id,
          name: item.localized_name,
          imageName: item.localized_name.toLowerCase().replace(/\s/g, ""),
          roles: item["roles"],
        });
      });
    })
    .catch((error) => {
      console.log(error.response);
    })
    .then(async function () {
      //After succesfully fetching and proganized the listed of newest hero list, save to mongoose cloud DB
      updatedHeroList.forEach(async (item) => {
        // console.log(item);
        const newHero = new HeroModel(item);
        await newHero.save();
      });

      console.log("Successfully fetched Hero data from OpenDota");
    });
}

module.exports = { populateHeroModel };
