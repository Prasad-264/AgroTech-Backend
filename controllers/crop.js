const Crop = require("../models/Crop");
const Farmer = require("../models/Farmer");
const Pesticide = require("../models/Pesticide");
const Fertilizer = require("../models/Fertilizer");

const addCrop = async (req, res) => {
  const { farmerId } = req.params;
  const { cropName, season, category, seedCost, laborCost } = req.body;

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
      seedCost,
      laborCost,
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
  const { cropName, season, category, seedCost, laborCost } = req.body;

  try {
    const crop = await Crop.findByIdAndUpdate(
      cropId,
      { cropName, season, category, seedCost, laborCost },
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

const getAllCrops = async (req, res) => {
  const { farmerId } = req.params;

  try {
    const farmer = await Farmer.findById(farmerId).populate("crops");

    if (!farmer) {
      return res
        .status(404)
        .json({ message: "Farmer not found" });
    }

    res.status(200).json(farmer.crops);
  } catch (error) {
    console.error("Error getting all crops:", error);
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

const getAllPesticides = async (req, res) => {
  const { cropId } = req.params;

  try {
    const crop = await Crop.findById(cropId).populate("pesticides");

    if (!crop) {
      return res
        .status(404)
        .json({ message: "Crop not found" });
    }

    res.status(200).json(crop.pesticides);
  } catch (error) {
    console.error("Error getting crop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addFertilizer = async (req, res) => {
	const { cropId } = req.params;
  const { name, manufacturer, quantity, cost, description } = req.body;

  try {
    const crop = await Crop.findById(cropId);

    if (!crop) {
      return res.status(404).json({ message: "Crop not found for this farmer" });
    }

    const fertilizer = new Fertilizer({
      name,
      manufacturer,
      quantity,
      cost,
      description,
    });

    await fertilizer.save();

    await Crop.findByIdAndUpdate(
      cropId,
      { $addToSet: { fertilizers: fertilizer._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Fertilizer added successfully",
      fertilizer,
    });
  } catch (error) {
    console.error("Error adding fertilizer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateFertilizer = async (req, res) => {
	const { fertilizerId } = req.params;
  const { name, manufacturer, quantity, cost, description } = req.body;

  try {
    const fertilizer = await Fertilizer.findByIdAndUpdate(
      fertilizerId,
      { name, manufacturer, quantity, cost, description },
      { new: true, runValidators: true }
    );

    if (!fertilizer) {
      return res.status(404).json({ message: "Fertilizer not found" });
    }

    res.status(200).json({
      message: "Fertilizer updated successfully",
      fertilizer,
    });
  } catch (error) {
    console.error("Error updating fertilizer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteFertilizer = async (req, res) => {
	const {cropId, fertilizerId } = req.params;
	try {
		const fertilizer = await Fertilizer.findByIdAndDelete(fertilizerId);

    if (!fertilizer) {
      return res.status(404).json({ message: "Fertilizer not found" });
    }

		await Crop.findByIdAndUpdate(
			cropId, 
			{ $pull: { fertilizers: fertilizer._id } }
		);

    res.status(200).json({
      message: "Fertilizer deleted successfully",
    });
	} catch (error) {
		console.error("Error getting fertilizer:", error);
    res.status(500).json({ message: "Server error" });
	}
};

const getFertilizer = async (req, res) => {
	const { fertilizerId } = req.params;
	try {
		const fertilizer = await Fertilizer.findById(fertilizerId);

    if (!fertilizer) {
      return res.status(404).json({ message: "Fertilizer not found" });
    }

    res.status(200).json(fertilizer);
	} catch (error) {
		console.error("Error getting fertilizer:", error);
    res.status(500).json({ message: "Server error" });
	}
};

const getAllFertilizers = async (req, res) => {
  const { cropId } = req.params;

  try {
    const crop = await Crop.findById(cropId).populate("fertilizers");

    if (!crop) {
      return res
        .status(404)
        .json({ message: "Crop not found" });
    }

    res.status(200).json(crop.fertilizers);
  } catch (error) {
    console.error("Error getting crop:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const calculateCropCost = async (req, res) => {
  const { cropId } = req.params;
  try {
    const crop = await Crop.findById(cropId)
      .populate('fertilizers')
      .populate('pesticides');

    if (!crop) {
      return res
        .status(404)
        .json({ message: "Crop not found" });
    }

    const fertilizerCost = crop.fertilizers.reduce((total, fertilizer) => {
      return total + fertilizer.cost;
    }, 0);

    const pesticideCost = crop.pesticides.reduce((total, pesticide) => {
      return total + pesticide.cost;
    }, 0);

    const totalCost = {
      cost: fertilizerCost + pesticideCost + crop.seedCost + crop.laborCost 
    };

    res.status(200).json(totalCost);
  } catch (error) {
    console.error('Error calculating crop cost:', error);
    throw error;
  }
}

module.exports = {
  addCrop,
  updateCrop,
  deleteCrop,
  getCrop,
  getAllCrops,
  addPesticide,
  updatePesticide,
  deletePesticide,
	getPesticide,
  getAllPesticides,
	addFertilizer,
  updateFertilizer,
  deleteFertilizer,
	getFertilizer,
  getAllFertilizers,
  calculateCropCost,
};
