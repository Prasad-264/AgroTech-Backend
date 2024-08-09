const mongoose = require("mongoose");

const fertilizerSchema = new mongoose.Schema({
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

const Fertilizer = mongoose.model("Fertilizer", fertilizerSchema);
module.exports = Fertilizer;
