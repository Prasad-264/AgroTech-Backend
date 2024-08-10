const Crop = require("../models/Crop");
const Farmer = require("../models/Farmer");
const Pesticide = require("../models/Pesticide");

const addCrop = async (req, res) => {
  const { farmerId } = req.params;
  const { cropName, season, category } = req.body;

  try {
    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const crop = new Crop({
      farmer: farmer._id,
      cropName,
      season,
      category,
    });

    await crop.save();

    await Farmer.findByIdAndUpdate(
      farmerId,
      { $addToSet: { crops: crop._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Crop added successfully",
      crop,
    });
  } catch (error) {
    console.error("Error adding crop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCrop = async (req, res) => {
  const { cropId } = req.params;
  const { cropName, season, category, fertilizers, pesticides } = req.body;

  try {
    const crop = await Crop.findByIdAndUpdate(
      cropId,
      { cropName, season, category, fertilizers, pesticides },
      { new: true, runValidators: true }
    );

    if (!crop) {
      return res.status(404).json({ message: "Crop not found for this farmer" });
    }

    res.status(200).json({
      message: "Crop updated successfully",
      crop,
    });
  } catch (error) {
    console.error("Error updating crop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCrop = async (req, res) => {
  const { farmerId, cropId } = req.params;

  try {
    const crop = await Crop.findByIdAndDelete(cropId);

    if (!crop) {
      return res.status(404).json({ message: "Crop not found for this farmer" });
    }

    await Farmer.findByIdAndUpdate(farmerId, {
      $pull: { crops: crop._id },
    });

    res.status(200).json({
      message: "Crop deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting crop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCrop = async (req, res) => {
  const { cropId } = req.params;

  try {
    const crop = await Crop.findById(cropId);

    if (!crop) {
      return res
        .status(404)
        .json({ message: "Crop not found for this farmer" });
    }

    res.status(200).json(crop);
  } catch (error) {
    console.error("Error getting crop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addPesticide = async (req, res) => {
  const { cropId } = req.params;
  const { name, manufacturer, quantity, cost, description } = req.body;

  try {
    const crop = await Crop.findById(cropId);

    if (!crop) {
      return res.status(404).json({ message: "Crop not found for this farmer" });
    }

    const pesticide = new Pesticide({
      name,
      manufacturer,
      quantity,
      cost,
      description,
    });

    await pesticide.save();

    await Crop.findByIdAndUpdate(
      cropId,
      { $addToSet: { pesticides: pesticide._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Pesticide added successfully",
      pesticide,
    });
  } catch (error) {
    console.error("Error adding pesticide:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePesticide = async (req, res) => {
  const { pesticideId } = req.params;
  const { name, manufacturer, quantity, cost, description } = req.body;

  try {
    const pesticide = await Pesticide.findByIdAndUpdate(
      pesticideId,
      { name, manufacturer, quantity, cost, description },
      { new: true, runValidators: true }
    );

    if (!pesticide) {
      return res.status(404).json({ message: "Pesticide not found" });
    }

    res.status(200).json({
      message: "Pesticide updated successfully",
      pesticide,
    });
  } catch (error) {
    console.error("Error updating pesticide:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePesticide = async (req, res) => {
  const { cropId, pesticideId } = req.params;
	
  try {
    const pesticide = await Pesticide.findByIdAndDelete(pesticideId);

    if (!pesticide) {
      return res.status(404).json({ message: "Pesticide not found" });
    }

    await Crop.findByIdAndUpdate(
			cropId, 
			{ $pull: { pesticides: pesticide._id } }
		);

    res.status(200).json({
      message: "Pesticide deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting pesticide:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPesticide = async (req, res) => {
	const { pesticideId } = req.params;
	try {
		const pesticide = await Pesticide.findById(pesticideId);

    if (!pesticide) {
      return res.status(404).json({ message: "Pesticide not found" });
    }

    res.status(200).json(pesticide);
	} catch (error) {
		console.error("Error getting pesticide:", error);
    res.status(500).json({ message: "Server error" });
	}
}

module.exports = {
  addCrop,
  updateCrop,
  deleteCrop,
  getCrop,
  addPesticide,
  updatePesticide,
  deletePesticide,
	getPesticide
};
