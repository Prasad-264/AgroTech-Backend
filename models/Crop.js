const cropSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  },
  cropName: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  fertilizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fertilizer",
    },
  ],
  pesticides: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pesticide",
    },
  ],
});

const Crop = mongoose.model("Crop", cropSchema);
module.exports = Crop;
