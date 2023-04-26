
const Overview = require("../../models/profile/overview")
const Person = require("../../models/person")
const Skill =  require("../../models/profile/skill")
const Education =  require("../../models/profile/education");
const Certification = require("../../models/profile/cerification");
const Project = require("../../models/profile/project")
const Work = require("../../models/profile/work")
const router = require("express").Router();

router.get("/",async (req, res) => {
res.render ('profile')
});


module.exports = router;

router.post("/", async (req, res) => {
    try {
      const newOverview = await Overview.create({
        text: req.body.overviewText,
        overviewUser: req.body.userTest,
      });
      res.status(201).json(newOverview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });


  router.post("/person", async (req, res) => {
    try {
      requiredData = req.body.perosnalcollection;
      console.log(requiredData)
  
      const newPersonal = await Person.create({
        name: requiredData.name,
        email: requiredData.email,
        phone: requiredData.phone,
        address: requiredData.address,
        githubProfile: requiredData.github,
        linkedin: requiredData.linkedin,
        portfolio: requiredData.portfolio,
      });
  
      res.status(201).json({ message: "New personal record created", data: newPersonal });
    } catch (error) {
      res.status(500).json({ message: "Unable to create personal record", error: error.message });
    }
  });
  

  router.post("/education", async (req, res) => {
    try {
      requiredData = req.body.educationItem;
  
      const newPersonal = await Education.create({
        school: requiredData.school,
        degree: requiredData.degree,
        startDate: requiredData.startDate,
        endDate: requiredData.endDate,
        educationdetail: requiredData.eduText,
        educationUser : req.body.userTest
      });
  
      res.status(201).json({ message: "New personal record created" });
    } catch (error) {
      res.status(500).json({ message: "Unable to create personal record", error: error.message });
    }
  });
  

router.post("/skill", async (req, res) => {
    try {
      requiredData = req.body.skillData;
      console.log(requiredData)
  
      const newSkill = await Skill.create({
        name: requiredData.skillName,
        level : requiredData.skillLevel,
        skillUser : req.body.userTest
      });
  
      res.status(201).json({ message: "New personal record created" });
    } catch (error) {
      res.status(500).json({ message: "Unable to create personal record", error: error.message });
    }
  });


  router.post("/certification", async (req, res) => {
    try {
      requiredData = req.body.certificateDate;
  
      const newPersonal = await Certification.create({
        name: requiredData.certName,
        organization: requiredData.issueOrg,
        dateEarned: requiredData.deteEarned ,
        expireDate: requiredData.expireDate,
        certicationUser : requiredData.userTest
      });
  
      res.status(201).json({ message: "New personal record created" });
    } catch (error) {
      res.status(500).json({ message: "Unable to create personal record", error: error.message });
    }
  });


  
  router.post("/project", async (req, res) => {
    try {
      requiredData = req.body.projectData;
  
      const newPersonal = await Project.create({
        projectName: requiredData.projectName,
        yourRole: requiredData.yourRole,
        startDate: requiredData.startDate ,
        endDate: requiredData.endDate,
        responsibility : requiredData.responsibility,
        userProject : requiredData.userTest
      });
  
      res.status(201).json({ message: "New personal record created" });
    } catch (error) {
      res.status(500).json({ message: "Unable to create personal record", error: error.message });
    }
  });


  
  router.post("/experience", async (req, res) => {
    try {
      requiredData = req.body.experiencedata ;
  
      const newPersonal = await Work.create({

        company: requiredData.companyName,
        endDate: requiredData.endDate,
        title: requiredData.jobTitle,
        location : requiredData.location,
        responsibility : requiredData.responsibility,
        startDate: requiredData.startDate ,
        workUser : requiredData.userTest
      });
  
      res.status(201).json({ message: "New personal record created" });
    } catch (error) {
      res.status(500).json({ message: "Unable to create personal record", error: error.message });
    }
  });

