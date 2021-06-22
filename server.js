const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', require('./routes/index'));


app.use(cors());

const dbURL = 'mongodb://localhost/LibraryDB';

mongoose.connect(dbURL,
  { useNewUrlParser: true , useUnifiedTopology: true },
 (req, res) => {
  console.log("Connected to database");
});




app.listen(3000, () => {
  console.log('listening on port 3k')
});