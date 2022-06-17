const express = require('express');

const router = express.Router();


const experiencesControllers = require('../controllers/experiences-controllers');


router.get('/:id', experiencesControllers.getExperienceById);


router.get('/experiences/:id', experiencesControllers.getExperiencesByUserId);


router.post('/', experiencesControllers.createExperience);


router.delete('/:id', experiencesControllers.deleteExperience);




module.exports = router;