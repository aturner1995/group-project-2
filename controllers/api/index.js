const router = require('express').Router();
const resumeRoutes = require('./resumeRoutes');
const aiRoutes = require('./aiRoutes')

router.use('/resume', resumeRoutes);
router.use('/ai', aiRoutes);

module.exports = router;