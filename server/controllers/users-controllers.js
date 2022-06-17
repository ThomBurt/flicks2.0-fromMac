const uuid = require('uuid').v4;

const HttpError = require('../models/http-error');

const { validationResult } = require('express-validator');


let DUMMY_USERS = [
    {
        id: '1',
        firstName: 'Thom',
        lastName: 'Burt',
        email: 'thom@test.com',
        username: 'thomburt2020',
        password: '****'
    }, 
    {
        id: '2',
        firstName: 'Jason',
        lastName: 'Moore',
        email: 'jason@test.com',
        username: 'jason2020',
        password: '******'
    }
] 



const getUsers = (req, res) => {
    res.status(200).json({users: DUMMY_USERS})
}

const signup = (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;
    const createdUser = {
        id: uuid(),
        firstName,
        lastName,
        email,
        username,
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser})
}

const login = (req, res) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email)

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('No user found with these credentials', 401)
    }
    res.json({message: 'User Logged in'})
};

const getUserById = (req, res) => {
    const userId = req.params.id;
    const user = DUMMY_USERS.find(u => {
        return u.id === userId;
    });
    if(!user) {
        throw new HttpError('Could not find this user!', 404);
    } 

    res.json({ user })
};

const getExperiencesByUserId = (req, res, next) => {
    const userId = req.params.id;
    const experiences = DUMMY_EXPERIENCES.filter(e => {
        return e.creator === userId
    })
    if(!experiences || experiences.length === 0) {
        throw new HttpError('Could not find this experience!', 404);
      } 

    res.json({ experiences })
}

const createUser = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs, please check your data', 422)
    }

    const { firstName, lastName, email, username, password } = req.body;
    const createdUser = {
        id: uuid(),
        firstName,
        lastName,
        email,
        username,
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser})
}

const deleteUser = ( req, res, next ) => {
    const userId = req.params.id;
    DUMMY_USERS = DUMMY_USERS.filter(u => u.ud !==userId)
    res.status(200).json({message: 'User deleted'})
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.getUserById = getUserById;
exports.getExperiencesByUserId = getExperiencesByUserId;
exports.createUser = createUser;
exports.deleteUser = deleteUser;