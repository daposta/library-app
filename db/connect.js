
const mongoose = require('mongoose')
// const dbURL = '';

const connectDB = (url) => {
  console.log(url)
  console.log('called connectDB...')
  return mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true },);
}


module.exports = connectDB