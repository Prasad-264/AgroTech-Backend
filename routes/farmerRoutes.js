const express = require('express');
const router = express.Router();
const {
  addFarmer,
  updateFarmer,
} = require('../controllers/farmer');

router.post('/:userId/add-farmer', addFarmer);
router.post('/:userId/update-farmer', updateFarmer);

module.exports = router;