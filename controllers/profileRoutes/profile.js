

const {Person,Work,Education,Certification,Overview ,Skill,Experience} = require("../../models");
const Project = require("../../models/project");
const router = require("express").Router();








router.get("/",async (req, res) => {

    const dbData  = await Person.findByPk(1,{
      include :[{model:Overview}, {model:Work}, {model : Education},{model : Project},{model : Certification}]
    })
  
    const test = dbData.get({ plain: true });
    console.log(test)
  res.render ('testing',{test})
  });

  module.exports = router;