const express = require('express');


const passport = require('passport');

const Joi = require('joi');

const router = express.Router();
const Book = require('../models/book')


router.post('/new_book_to_library', passport.authenticate(jwt, {session: false}), (req, res)=>{
  const newBook = new Book({req.body});
  const savedBook = await newBook.save()
  .catch(err => res.json({msg: 'Cannot add book at the moment'}))
  if(savedBook) res.json({msg: 'Book has been added to library'})
});

module.exports =  router;