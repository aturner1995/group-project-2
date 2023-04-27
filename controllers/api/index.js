const router = require('express').Router();
const resumeRoutes = require('./resumeRoutes');
const userRoutes = require('./userRoutes');

router.use('/resume', resumeRoutes);
router.use('/users', userRoutes);

module.exports = router;