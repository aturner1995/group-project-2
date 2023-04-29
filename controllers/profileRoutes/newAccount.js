const { User, Person, Work, Education, Certification, Overview, Skill, Project } = require("../../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render('profile', {
    logged_in: req.session.logged_in
  })
});

router.post("/", async (req, res) => {
  try {
    const existingOverview = await Overview.findAll({
      where: { user_id: req.session.user_id },
    });

    if (existingOverview.length) {
      const updatedOverview = await Overview.update({
        text: req.body.overviewText,
      },
        {
          where: {
            id: existingOverview[0].id,
            user_id: req.session.user_id
          }
        }
      );
      res.status(200).json(updatedOverview);
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

router.post("/person", async (req, res) => {
  try {
    const requiredData = req.body.perosnalcollection;

    const existingPerson = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
      include: [
          { model: Person }, 
      ]
  });

  console.log(existingPerson.people)

    if (existingPerson.people.length) {
      const updatePerson = await Person.update({
        name: requiredData.name,
        email: requiredData.email,
        phone: requiredData.phone,
        address: requiredData.address,
        githubProfile: requiredData.github,
        linkedin: requiredData.linkedin,
        portfolio: requiredData.portfolio,
        user_id: req.session.user_id
      })
      res.status(200).json({ message: "Person record updated" });

    } else {
      const newPersonal = await Person.create({
        name: requiredData.name,
        email: requiredData.email,
        phone: requiredData.phone,
        address: requiredData.address,
        githubProfile: requiredData.github,
        linkedin: requiredData.linkedin,
        portfolio: requiredData.portfolio,
        user_id: req.session.user_id
      });

      res.status(201).json({ message: "New personal record created", });
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
      user_id: req.session.user_id
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

module.exports = router;
