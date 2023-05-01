const { Person, Work, Education, Certification, Overview, Skill, Project } = require("../../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  if (!req.session.logged_in) {
    res.render('login')
  }else{
  res.render('profile', {
    logged_in: req.session.logged_in
  })
}
});
router.post("/", async (req, res) => {
  try {
    const existingOverview = await Overview.findOne({
      where: { user_id: req.session.user_id },
    });

    if (existingOverview) {
      const updatedOverview = await existingOverview.update({
        text: req.body.overviewText,
      });
      res.status(200).json({message : "overview updated successfully"});
    } else {
      const newOverview = await Overview.create({
        text: req.body.overviewText,
        user_id: req.session.user_id,
      });
      res.status(200).json(newOverview);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});




router.post('/person', async (req, res) => {
  try {
    const requiredData = req.body.perosnalcollection;
    const existingPerson = await Person.findOne({ where: { user_id: req.session.user_id } });

    if (existingPerson) {
      await existingPerson.update({
        name: requiredData.name,
        email: requiredData.email,
        phone: requiredData.phone,
        address: requiredData.address,
        githubProfile: requiredData.github,
        linkedin: requiredData.linkedin,
        portfolio: requiredData.portfolio,
      });
      res.status(200).json({ message: 'Person record updated' });
    } else {
      const newPersonal = await Person.create({
        name: requiredData.name,
        email: requiredData.email,
        phone: requiredData.phone,
        address: requiredData.address,
        githubProfile: requiredData.github,
        linkedin: requiredData.linkedin,
        portfolio: requiredData.portfolio,
        user_id: req.session.user_id,
      });
      res.status(201).json({ message: 'New personal record created' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unable to create/update personal record', error: error.message });
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
      user_id: req.session.user_id
    });

    res.status(201).json({ message: "New personal record created" });
  } catch (error) {
    res.status(500).json({ message: "Unable to create personal record", error: error.message });
  }
});


  router.put("/education", async (req, res) => {
    try {
      requiredData = req.body.educationItem;
      requiredEduID = requiredData.eduId
  
      const newPersonal = await Education.update({
        school: requiredData.school,
        degree: requiredData.degree,
        startDate: requiredData.startDate,
        endDate: requiredData.endDate,
        educationdetail: requiredData.eduText,
      },{
        where:{
          id:requiredEduID
        }
      });
  
      res.status(201).json({ message: "New personal record created" });
    } catch (error) {
      res.status(500).json({ message: "Unable to create personal record", error: error.message });
    }
  });
  
router.post("/skill", async (req, res) => {
  try {
    requiredData = req.body.skillData;

    const newSkill = await Skill.create({
      name: requiredData.skillName,
      level: requiredData.skillLevel,
      user_id: req.session.user_id
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
      dateEarned: requiredData.deteEarned,
      expireDate: requiredData.expireDate,
      user_id: req.session.user_id
    });

    res.status(201).json({ message: "New personal record created" });
  } catch (error) {
    res.status(500).json({ message: "Unable to create personal record", error: error.message });
  }
});

router.put("/certification", async (req, res) => {
  try {
    requiredData = req.body.certificateDate;
    certID = requiredData.certId

    const newPersonal = await Certification.update({
      name: requiredData.certName,
      organization: requiredData.issueOrg,
      dateEarned: requiredData.deteEarned,
      expireDate: requiredData.expireDate,
      user_id: req.session.user_id
    },{
      where : {
        id :certID
      }
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
      startDate: requiredData.startDate,
      endDate: requiredData.endDate,
      responsibility: requiredData.responsibility,
      user_id: req.session.user_id
    });

    res.status(201).json({ message: "New personal record created" });
  } catch (error) {
    res.status(500).json({ message: "Unable to create personal record", error: error.message });
  }
});


router.put("/project", async (req, res) => {
  try {
    requiredData = req.body.projectData;
    proId = requiredData.projectid

    const newPersonal = await Project.update({
      projectName: requiredData.projectName,
      yourRole: requiredData.yourTitle,
      startDate: requiredData.startDate,
      endDate: requiredData.endDate,
      responsibility: requiredData.responsibility,
      user_id: req.session.user_id
    },{
      where:{
        id:proId
      }
    });

    res.status(201).json({ message: "New personal record created" });
  } catch (error) {
    res.status(500).json({ message: "Unable to create personal record", error: error.message });
  }
});





router.post("/experience", async (req, res) => {
  try {
    requiredData = req.body.experiencedata;

    const newPersonal = await Work.create({

      company: requiredData.companyName,
      endDate: requiredData.endDate,
      title: requiredData.jobTitle,
      location: requiredData.location,
      responsibility: requiredData.responsibility,
      startDate: requiredData.startDate,
      user_id: req.session.user_id
    });

    await res.status(200).json({ newPersonal });
  } catch (error) {
    res.status(500).json({ message: "Unable to create personal record", error: error.message });
  }
});


router.put("/experience", async (req, res) => {
  try {
    requiredData = req.body.experiencedata;
    expId  =  requiredData.workId

    const newPersonal = await Work.update({
      company: requiredData.companyName,
      endDate: requiredData.endDate,
      title: requiredData.jobTitle,
      location: requiredData.location,
      responsibility: requiredData.responsibility,
      startDate: requiredData.startDate,
      user_id: req.session.user_id
    },{
      where :{
        id : expId
      }
    });

    await res.status(200).json({ newPersonal });
  } catch (error) {
    res.status(500).json({ message: "Unable to create personal record", error: error.message });
  }
});



router.delete('/experience/:id', async (req, res) => {
  try {
    const deleteId = req.params.id;
    await Work.destroy({ where: { id: deleteId } });
    res.status(200).json(deleteId)
  } catch (err) {
    res.status(500).json({ error: "Request failed" });
  }
});

router.delete('/project/:id', async (req, res) => {
  try {
    const deleteId = req.params.id;
    await Project.destroy({ where: { id: deleteId } });
    res.status(200).json(deleteId)
  } catch (err) {
    res.status(500).json({ error: "Request failed" });
  }
});


router.delete('/education/:id', async (req, res) => {
  try {
    const deleteId = req.params.id;
    await Education.destroy({ where: { id: deleteId } });
    res.status(200).json(deleteId)
  } catch (err) {
    res.status(500).json({ error: "Request failed" });
  }
});

router.delete('/certification/:id', async (req, res) => {
  try {
    const deleteId = req.params.id;
    await Certification.destroy({ where: { id: deleteId } });
    res.status(200).json(deleteId)
  } catch (err) {
    res.status(500).json({ error: "Request failed" });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleteId = req.params.id;
    await Skill.destroy({ where: { id: deleteId } });
    res.status(200).json(deleteId)
  } catch (err) {
    res.status(500).json({ error: "Request failed" });
  }
});




module.exports = router;
