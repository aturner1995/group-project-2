const router = require('express').Router();


router.get('/', (req, res) => {

    res.render('homepage', {
        logged_in: req.session.logged_in
    })
});

router.get('/login', (req, res) => {
    res.render('login')
});

module.exports = router;