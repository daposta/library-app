const express = require('express');


const passport = require('passport');


const router = express.Router();

const {addNewBook, getAllBooks, getABook,
editBookInfo} = require('../controllers/book')


router.post('/', passport.authenticate("jwt", {session : false}), addNewBook );


router.get('/', passport.authenticate("jwt", {session : false}), getAllBooks);

router.get('/:id', passport.authenticate("jwt", {session: false}), getABook );

router.patch('/:id', passport.authenticate("jwt", {session: false}), editBookInfo );


// router.post('/borrow/:id', passport.authenticate('jwt', {session: false}), (req, res)=>{
//     Book.findByID(id).then(book => {
    
//           return res.status(200).json(book) 
       
//       });

// });

// router.get('/return/:id', passport.authenticate(' ', {session: false}), (req, res)=>{
//     Book.findByID(id).then(book => {
    
//           return res.status(200).json(book) 
       
//       });
//     //change penalty

// })

module.exports =  router;