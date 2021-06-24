const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  timestamps: {} ,
  title: {type: String, required:true},
  author: {type: String, required:true},
  unit_price: {type: Number, required:true,  },
  quantity : {type: Number, required:true,  },
  total_cost : {type: Number, required:true,  },
});

module.exports = mongoose.model('Book', BookSchema);


