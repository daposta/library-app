const express = require('express');


const passport = require('passport');

const Joi = require('joi');

const router = express.Router();
const Book = require('./models/book')


router.post('/books', passport.authenticate(jwt, {session: false}), (req, res)=>{
  //validate data
    const schema = Joi.object({
      title: Joi.string().required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `Title is a required field`
    }),
      author: Joi.string().min(6).required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `Author is a required field`
    }),
      unit_price: Joi.string().min(6).required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `Author is a required field`
    }),
      quantity: Joi.string().min(6).required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `Author is a required field`
    })
    })//.options({abortEarly : false});

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
   // const { error, value } = schema.validate(req.body, options);
   const  { error, value } =  schema.validate(req.body, options);

  
});


router.get('/books', passport.authenticate(jwt, {session: false}), (req, res)=>{
    Book.find().then(books => {
    
          return res.status(200).json(books) 
       
      });

})

router.get('/books/:id', passport.authenticate(jwt, {session: false}), (req, res)=>{
    Book.findByID(id).then(book => {
    
          return res.status(200).json(book) 
       
      });

})

module.exports =  router;