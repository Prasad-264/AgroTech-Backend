const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
