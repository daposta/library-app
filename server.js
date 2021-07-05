const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb = require('./db/connect')
const notFound = require('./middlewares/routenotfound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')
require('dotenv').config();

require('./auth/passport')

const app = express();




app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/', require('./routes/index'));
app.use(notFound)
app.use(errorHandlerMiddleware)
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