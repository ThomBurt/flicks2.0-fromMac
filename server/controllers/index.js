const router = require('express').Router();
const apiRoutes = require('./api');
//const otherRoutes = require('../routes');

router.use('/api', apiRoutes);

//router.use('/flicks', otherRoutes);


module.exports = router;
