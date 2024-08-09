const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  contactNumber: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  crops: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Crop' 
  }],
  expenses: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Expense' 
  }]
});

const Farmer = mongoose.model('Farmer', farmerSchema);
module.exports = Farmer;
