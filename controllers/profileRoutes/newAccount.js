
const {Person,Work,Education,Certification,Overview ,Skill,Experience} = require("../../models");
const Project = require("../../models/project");
const router = require("express").Router();

router.get("/",async (req, res) => {

  const dbData  = await Person.findByPk(1,{
    include :[{model:Overview}, {model:Work}, {model : Education},{model : Project},{model : Certification}]
  })

  const test = dbData.get({ plain: true });
  console.log(test)
res.render ('profile',{test})
});






router.post("/overview", async (req, res) => {
  try {
    const existingOverview = await Overview.findOne({
      where: { overviewUser: req.body.userTest },
    });
    console.log(existingOverview)

    if (existingOverview) {
      const updatedOverview = await existingOverview.update({
        text: req.body.overviewText,
      });
      res.status(200).json(updatedOverview);
    } else {
      const newOverview = await Overview.create({
        text: req.body.overviewText,
        overviewUser: req.body.userTest,
      });
      res.status(200).json(newOverview)
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});













router.post("/person", async (req, res) => {
  try {
    const requiredData = req.body.perosnalcollection;
    console.log(requiredData);

    const existingPerson = await Person.findOne({ email: requiredData.email });

    if (existingPerson) {
      existingPerson.name = requiredData.name;
      existingPerson.phone = requiredData.phone;
      existingPerson.address = requiredData.address;
      existingPerson.githubProfile = requiredData.github;
      existingPerson.linkedin = requiredData.linkedin;
      existingPerson.portfolio = requiredData.portfolio;

      await existingPerson.save();

      res.status(200).json({ message: "Person record updated"});
    } else {
      const newPersonal = await Person.create({
        name: requiredData.name,
        email: requiredData.email,
        phone: requiredData.phone,
        address: requiredData.address,
        githubProfile: requiredData.github,
        linkedin: requiredData.linkedin,
        portfolio: requiredData.portfolio,
      });

      res.status(201).json({ message: "New personal record created",});
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to create/update personal record", error: error.message });
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
  





  router.put("/education", async (req, res) => {
    try {
      requiredData = req.body.educationItem;
      requiredEduID = req.body.eduId
  
      const newPersonal = await Education.update({
        school: requiredData.school,
        degree: requiredData.degree,
        startDate: requiredData.startDate,
        endDate: requiredData.endDate,
        educationdetail: requiredData.eduText,
        educationUser : req.body.userTest
      },{
        where: requiredEduID
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


  router.put("/project", async (req, res) => {
    try {
      const projectData = req.body.projectData;
      const projectid = projectData.projectid;
      console.log(projectid);

      const updatedProjectRecord = await Project.update({
        projectName: projectData.projectName,
        yourRole: projectData.yourRole,
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        responsibility: projectData.responsibility,
        userProject: projectData.userTest,
      }, {
        where: { id: projectid }
      });
  
      await res.status(200).json({ message: "Project record updated", updatedProjectRecord });
    } catch (error) {
      res.status(500).json({ message: "Unable to update project record", error: error.message });
    }
  });














  
  router.post("/experience", async (req, res) => {
    try {
      const requiredData = req.body.experiencedata;

        const newPersonal = await Work.create({
          company: requiredData.companyName,
          endDate: requiredData.endDate,
          title: requiredData.jobTitle,
          location: requiredData.location,
          responsibility: requiredData.responsibility,
          startDate: requiredData.startDate,
          workUser: requiredData.userTest,
       
        });
  
        await res.status(200).json({ message: "Work record created", newPersonal });
      }
    catch (error) {
      res.status(500).json({ message: "Unable to create or update work record", error: error.message });
    }

  })


  router.put("/experience", async (req, res) => {
    try {
      const requiredData = req.body.experiencedata;
      const workId = requiredData.workId;
      const user = requiredData.userTest
      console.log(workId);

  
      await Work.update(
        {
          company: requiredData.companyName,
          endDate: requiredData.endDate,
          title: requiredData.jobTitle,
          location: requiredData.location,
          responsibility: requiredData.responsibility,
          startDate: requiredData.startDate,
        },
        {
          where: { id: workId },
        }
      );
  
    } catch (error) {
      res.status(500).json({ message: "Unable to update work record", error: error.message });
    }
  });
  









  module.exports = router;