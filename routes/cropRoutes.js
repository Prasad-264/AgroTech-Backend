const express = require('express');
const router = express.Router();
const {
  addCrop,
  updateCrop,
  deleteCrop,
  getCrop,
  getAllCrops,
  addPesticide,
  updatePesticide,
  deletePesticide,
  getPesticide,
  addFertilizer,
  updateFertilizer,
  deleteFertilizer,
	getFertilizer,
} = require('../controllers/crop');

router.post('/:farmerId/add-crop', addCrop);
router.put('/:cropId/update-crop', updateCrop);
router.delete('/:farmerId/:cropId/delete-crop', deleteCrop);
router.get('/:cropId/get-crop', getCrop);
router.get('/:farmerId/crops', getAllCrops);

router.post('/:cropId/add-pesticide', addPesticide);
router.put('/:pesticideId/update-pesticide', updatePesticide);
router.delete('/:cropId/:pesticideId/delete-pesticide', deletePesticide);
router.get('/:pesticideId/get-pesticide', getPesticide);

router.post('/:cropId/add-fertilizer', addFertilizer);
router.put('/:fertilizerId/update-fertilizer', updateFertilizer);
router.delete('/:cropId/:fertilizerId/delete-fertilizer', deleteFertilizer);
router.get('/:fertilizerId/get-fertilizer', getFertilizer);

module.exports = router;