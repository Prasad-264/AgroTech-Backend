const express = require('express');
const router = express.Router();
const {
  addFarmer,
  updateFarmer,
  deleteFarmer,
} = require('../controllers/farmer');

router.post('/:userId/add-farmer', addFarmer);
router.put('/:farmerId/update-farmer', updateFarmer);
router.delete('/:userId/:farmerId/delete-farmer', deleteFarmer);

module.exports = router;