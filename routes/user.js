const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User')
const Joi = require('joi');

router.post('/login', (req, res) =>{

    //validate data
    const schema = Joi.object({
      email: Joi.string().required();
      email: Joi.string().min(6).required();
    });
    const validate = schema.validate(req.body);

    if(validate.error){
      res.status(400).send(validate.error.details[0].message);
      return;
    }
    const {email, password } = req.body;


    //check user with email already exists
    const userWithEmail = await User.findOne({email})
    .catch(err => {console.log(err)});

    if (!userWithEmail){
      return res.json({msg: 'User does not exist'})
    }

    //check if passwords match
    if(userWithEmail !== password){
      return res.json({msg: 'User does not exist'})
    }

    const payload = {
    sub: _id,
    iat: Date.now()
   };

   const jwtToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
   res.json({msg: 'Welcome back', token: "Bearer " +  jwtToken, expires : 1d});


    //return token
});