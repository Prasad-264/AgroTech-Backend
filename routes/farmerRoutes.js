const express = require('express');
const router = express.Router();
const {
  addFarmer,
  updateFarmer,
  deleteFarmer,
  getFarmerById,
} = require('../controllers/farmer');

router.post('/:userId/add-farmer', addFarmer);
router.put('/:farmerId/update-farmer', updateFarmer);
router.delete('/:userId/:farmerId/delete-farmer', deleteFarmer);
router.get('/:farmerId/get-farmer', getFarmerById);

module.exports = router;