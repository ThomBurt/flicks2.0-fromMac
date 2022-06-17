const express = require('express');

const router = express.Router();

const { check } = require('express-validator');



const usersControllers = require('../controllers/users-controllers');



router.get('/', usersControllers.getUsers);


router.post('/signup', usersControllers.signup);


router.post('/login', usersControllers.login); 


router.get('/:id', usersControllers.getUserById);


router.post('/',
    check('email')
        .not()
        .isEmpty(),
    check('password')
        .isLength({min: 6}),
    usersControllers.createUser);


router.delete('/:id', usersControllers.deleteUser);




module.exports = router;