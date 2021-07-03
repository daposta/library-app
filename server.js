const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb = require('./db/connect')

require('dotenv').config();

require('./auth/passport')

const app = express();




app.use(express.urlencoded({extended: true}));
app.use(express.json());


// var passport  = require('passport');

 //(passport)

app.use('/', require('./routes/index'));


app.use(cors());



const start = async () => {
  try{
      await connectDb(process.env.MONGODB_URI);
      app.listen(3000, console.log('listening on port 3k'));
  }catch(err){
    console.log(err)
  }
}

start()