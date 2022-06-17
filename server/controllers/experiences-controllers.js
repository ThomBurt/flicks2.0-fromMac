const uuid = require('uuid').v4;

const HttpError = require('../models/http-error');


let DUMMY_EXPERIENCES = [
    {
        id: '1',
        movie: 'Pirates of the caribeann',
        dinner: 'bru burger',
        drink: 'manhattan',
        creator: '1'
    },
    {
        id: '2',
        movie: 'Step Brothers',
        dinner: 'Mcdonalds',
        drink: 'Lager',
        creator: '2'
    },
    {
        id: '3',
        movie: 'Step Brothers',
        dinner: 'Mcdonalds',
        drink: 'Lager',
        creator: '1'
    }
]



const getExperienceById = (req, res) => {
    const experienceId = req.params.id;
    const experience = DUMMY_EXPERIENCES.find(e => {
        return e.id === experienceId;
    });
    if(!experience) {
        throw new HttpError('Could not find this experience!', 404);
    } 

    res.json({ experience })
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

const createExperience = (req, res, next) => {
    const { movie, dinner, drink, createdAt } = req.body;
    const createdExperience = {
        id: uuid(),
        movie,
        dinner,
        drink,
        createdAt: new Date()
    };

    DUMMY_EXPERIENCES.push(createdExperience);

    res.status(201).json({experience: createdExperience})
}

const deleteExperience = ( req, res, next ) => {
    const experienceId = req.params.id;
    DUMMY_EXPERIENCES = DUMMY_EXPERIENCES.filter(e => e.ed !==experienceId)
    res.status(200).json({message: 'Your Experience was deleted'})
}

exports.getExperienceById = getExperienceById;
exports.getExperiencesByUserId = getExperiencesByUserId;
exports.createExperience = createExperience;
exports.deleteExperience = deleteExperience;