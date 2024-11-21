const mongoose = require("mongoose");

const HeroesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
  goodWith: {
    type: [String],
    required: false,
  },
  counteredByItems: {
    type: [String],
    required: false,
  },
});

const HeroModel = mongoose.model("heroes", HeroesSchema, "heroes");

module.exports = HeroModel;
