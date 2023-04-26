const router = require('express').Router();
const resumeRoutes = require('./resumeRoutes');

router.use('/resume', resumeRoutes);

module.exports = router;