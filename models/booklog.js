const mongoose = require('mongoose');

const BookLogSchema = mongoose.Schema({
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  },
  book: [
      {type: Schema.Types.ObjectId, ref: 'book'}
    ],
  user: [
      {type: Schema.Types.ObjectId, ref: 'user'}
    ],
  borrow: {type: Boolean, required:true},
  return: {type: Boolean, required:true},
})

module.exports = mongoose.model('User', UserSchema);