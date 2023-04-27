const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/authorization.js');

router.get('/', (req, res) => {

    res.render('homepage')
});

router.get('/login', (req,res) => {
    res.render('login')
});

module.exports = router;