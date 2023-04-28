const router = require('express').Router();
const newAccount =require("./newAccount")

router.use('/new', newAccount);

module.exports = router;
