const express = require('express');
const router = express.Router();
const {
  addCrop,
  updateCrop,
  deleteCrop,
  getCrop,
  addPesticide,
  updatePesticide,
  deletePesticide,
  getPesticide,
} = require('../controllers/crop');

router.post('/:farmerId/add-crop', addCrop);
router.put('/:cropId/update-crop', updateCrop);
router.delete('/:farmerId/:cropId/delete-crop', deleteCrop);
router.get('/:cropId/get-crop', getCrop);
router.post('/:cropId/add-pesticide', addPesticide);
router.put('/:pesticideId/update-pesticide', updatePesticide);
router.delete('/:cropId/:pesticideId/delete-pesticide', deletePesticide);
router.get('/:pesticideId/get-pesticide', getPesticide);

module.exports = router;