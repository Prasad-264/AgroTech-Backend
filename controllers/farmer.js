const Farmer = require("../models/Farmer");
const User = require("../models/User");

const addFarmer = async (req, res) => {
  const { userId } = req.params;
  const { name, address, contactNumber, email } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const farmer = new Farmer({
      name,
      address,
      contactNumber,
      email,
    });
    await farmer.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { farmers: farmer._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Farmer added successfully",
      farmer,
    });
  } catch (error) {
    console.error("Error adding farmer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateFarmer = async (req, res) => {
  const { farmerId } = req.params;
  const { name, address, contactNumber, email } = req.body;

  try {
    const farmer = await Farmer.findByIdAndUpdate(
      farmerId,
      { name, address, contactNumber, email },
      { new: true, runValidators: true }
    );

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({
      message: "Farmer updated successfully",
      farmer,
    });
  } catch (error) {
    console.error("Error updating farmer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteFarmer = async (req, res) => {
  const { farmerId, userId } = req.params;

  try {
    const farmer = await Farmer.findByIdAndDelete(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { farmers: farmer._id },
    });

    res.status(200).json({
      message: "Farmer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting farmer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addFarmer,
  updateFarmer,
  deleteFarmer,
};
