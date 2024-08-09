const express = require('express');
const router = express.Router();
const {
  addFarmer,
} = require('../controllers/farmer');

router.post('/:userId/add-farmer', addFarmer);

module.exports = router;