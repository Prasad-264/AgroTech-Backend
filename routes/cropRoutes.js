const express = require('express');
const router = express.Router();
const {
  addCrop,
  updateCrop,
  deleteCrop,
  getCrop,
} = require('../controllers/crop');

router.post('/:farmerId/add-crop', addCrop);
router.put('/:cropId/update-crop', updateCrop);
router.delete('/:farmerId/:cropId/delete-crop', deleteCrop);
router.get('/:cropId/get-crop', getCrop);

module.exports = router;