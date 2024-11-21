const mongoose = require("mongoose");
const HeroModel = require("./models/Heroes");

//To RUN: Right-click, run code.

function getImgUrl(heroName) {
  var imageName = heroName.toLowerCase().replace(/\s/g, "");
  var imageURL = `../assets/HeroImages/${imageName}.png`;
  console.log(imageURL);
  return imageURL;
}

getImgUrl("Axe");

//Find id by Name
