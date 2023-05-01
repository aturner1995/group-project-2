const router = require('express').Router();
const resumeRoutes = require('./resumeRoutes');
const aiRoutes = require('./aiRoutes')
const userRoutes = require('./userRoutes');
const coverletterRoutes = require('./coverLetterRoutes')

router.use('/resume', resumeRoutes);
router.use('/ai', aiRoutes);
router.use('/users', userRoutes);
router.use('/coverletter', coverletterRoutes)

module.exports = router;