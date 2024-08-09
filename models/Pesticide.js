const mongoose = require("mongoose");

const pesticideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

const Pesticide = mongoose.model("Pesticide", pesticideSchema);
module.exports = Pesticide;
