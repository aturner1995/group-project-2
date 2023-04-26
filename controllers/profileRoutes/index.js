const router = require('express').Router();

const newAccount =require("./newAccount.js")


router.use('/new', newAccount);

module.exports = router;
