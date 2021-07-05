const express = require('express');
const Joi = require('joi');
const Book = require('../models/book')
const asyncWrapper = require('../middlewares/asyncwrapper');

const getAllBooks = asyncWrapper(async (req, res)=>{
      
        const books = await Book.find()
      return res.status(200).json({success: true, books: books})
    


});

const getABook = asyncWrapper(async (req, res)=>{
  
  
      const {id:bookID} = req.params;
      
      const book = await Book.findOne({_id:bookID});
           if (!book){
        return res.status(404).json({success: false, msg: `No task with id:  ${bookID}`})
      }

       res.status(200).json({success:true, book: book})
 

})


const editBookInfo = asyncWrapper(async (req, res) =>{

  
      const {id:bookID} = req.params;
      
      const book = await Book.findOneAndUpdate({_id:bookID}, req.body, {
        new:true, runValidators:true, useFindAndModify:false
      });
      if (!book){
        return res.status(404).json({success: false, msg: `No task with id:  ${bookID}`})
      }

       res.status(200).json({success:true, book: book})
 

});

const addNewBook = asyncWrapper(async (req, res) => {
  //validate data
    const schema = Joi.object({
      title: Joi.string().required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `title is a required field`
    }),
      author: Joi.string().min(6).required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `author is a required field`
    }),
      unit_price: Joi.number().required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `unit_price is a required field`
    }),
      quantity: Joi.number().required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `quantity is a required field`
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
   if (error) {
      // on fail return comma separated errors
      msgs = []
      error.details.map(x => msgs.push(x.message));
      
      return res.status(400).send(msgs);
      

    }
   value.total_cost = value.quantity  * value.unit_price;
  
      const newBook = await Book.create(value)
      return res.status(201).json({success: true, book: newBook })
   
 
   
})

module.exports = {
  getAllBooks, getABook, editBookInfo, addNewBook
}