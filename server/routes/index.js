const router = require('express').Router();
const experienceRoutes = require('./experience-routes.js');
const userRoutes = require('./user-routes');

router.use('/experiences', experienceRoutes);
router.use('/users', userRoutes);

module.exports = router;
