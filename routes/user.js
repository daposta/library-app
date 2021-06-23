const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User')
const Joi = require('joi');

router.post('/login', (req, res) =>{

    //validate data
    const schema = Joi.object({
      email: Joi.string().required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `Email is a required field`
    }),
      password: Joi.string().min(6).required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `Password is a required field`
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

    if(error){
      msgs = []
      error.details.map(x => msgs.push(x.message));
      
      res.status(400).send(msgs);
      return;
    }
    const email = value.email;

    //check user with email already exists
    User.findOne({email}, (err, user)=>{
      if (err){
        console.log(err);
      }
      console.log(` ${user} `)
      // if(user.password !== value.password){
      //   res.status(401).json({msg: 'User does not exist'})
      //   return;
      // }
      bcrypt.compare(value.password, user.password, (err, isMatch) =>{
        
        if(err) throw err
        if(isMatch){
          const _jwt = jsonwebtoken.sign( {sub: user.id,  iat: Date.now()}, process.env.JWT_SECRET);
          res.send({msg: 'Login successful', token:_jwt , expires_in: '1d'})
        }else{
          res.send({msg: 'No user with credentials'});
        }
      })


    })
   

    //return token
});


router.post('/register', (req, res, next) =>{
    console.log(req.body)
    //validate data
    const schema = Joi.object({
      email: Joi.string().required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `Email is a required field`
    }),
      password: Joi.string().min(6).required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `Password is a required field`
    }),
      name: Joi.string().min(3).required().messages({
      // 'string.base': `"a" should be a type of 'text'`,
      // 'string.empty': `"a" cannot be an empty field`,
      // 'string.min': `"a" should have a minimum length of {#limit}`,
      'any.required': `Name is a required field`
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
      
      res.status(400).send(msgs);
      return;

    } 
    const email = value.email;
   //check user with email already exists
   User.findOne({email}, (err, user) => {
     if (user){
         res.status(400).json({msg: 'User already exists'});
         return;
      }
      const newUser = new User(value);

      bcrypt.genSalt(10, (err, salt)=> {
        if(err){

        }
        bcrypt.hash(newUser.password, salt , (err, hash)=> {
            newUser.password = hash;
            newUser.save()
            .then(user =>{
              res.status(201).json({msg: 'User created'})
            })
            .catch(err => {
              res.status(400).send(err)
            })
          });

       });
    });
   
      

   
  

   
});

module.exports = router;

