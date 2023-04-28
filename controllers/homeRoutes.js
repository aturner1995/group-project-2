
const {Person,Work,Education,Certification,Overview ,Skill,Project} = require("../models");
const router = require("express").Router();








router.get("/dashboard",async (req, res) => {

    const dbData  = await Person.findByPk(1,{
      include :[{model:Overview}, {model:Work}, {model : Education},{model : Project},{model : Certification}]
    })
  
    const allData = dbData.get({ plain: true });

  res.render ('dashboard',{allData})
  });



router.get('/', (req, res) => {

    res.render('homepage', {
        logged_in: req.session.logged_in
    })
});

router.get('/login', (req, res) => {
    res.render('login')
});

module.exports = router;

