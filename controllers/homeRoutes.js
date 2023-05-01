
const { Person, Work, Education, Certification, Overview, Skill, Project, User } = require("../models");
const router = require("express").Router();

router.get("/dashboard", async (req, res) => {

  const dbData = await User.findByPk(req.session.user_id, {
    include: [{ model: Overview }, { model: Person }, { model: Work }, { model: Education }, { model: Project }, { model: Certification },{model:Skill}]
  })

  const allData = dbData.get({ plain: true });

  res.render('dashboard', {
    ...allData,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  })
});

router.get('/', (req, res) => {
  res.render('homepage', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  })
});

router.get('/login', (req, res) => {

  if (!req.session.logged_in) {
    res.render('login')
  }
  else {
    res.redirect('/dashboard');
  }
});

router.get('/resume', (req, res) => {
  res.render('resume', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  })
})

module.exports = router;
router.get('/jobs', (req, res) => {
  res.render('jobs', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  })
})


router.get("/jobs/title", async (req, res) => {
  try {
    const dbData = await User.findByPk(req.session.user_id, {
      include: [{ model: Work}],
    });
    res.json(dbData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

