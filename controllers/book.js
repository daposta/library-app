const express = require('express');
const Joi = require('joi');
const Book = require('../models/book')

const getAllBooks = (req, res)=>{
    Book.find().then(books => {
    
          return res.status(200).json(books) 
       
      });

};

const getABook = (req, res)=>{
    Book.findByID(id).then(book => {
    
          return res.status(200).json(book) 
       
      });

}


const editBookInfo = (req, res) =>{

};

const addNewBook = async (req, res) => {
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
   const newBook = Book.create(req.body)


  
}

module.exports = {
  getAllBooks, getABook, editBookInfo, addNewBook
}