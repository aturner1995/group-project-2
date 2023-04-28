const router = require('express').Router();
const resumeRoutes = require('./resumeRoutes');
const aiRoutes = require('./aiRoutes')
const userRoutes = require('./userRoutes');

router.use('/resume', resumeRoutes);
router.use('/ai', aiRoutes);
router.use('/users', userRoutes);

module.exports = router;