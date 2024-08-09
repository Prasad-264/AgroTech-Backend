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

    user.farmers.push(farmer._id);
    await user.save();

    res.status(201).json({
      message: "Farmer added successfully",
      farmer,
    });
  } catch (error) {
    console.error("Error adding farmer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addFarmer,
};
