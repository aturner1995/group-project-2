
const { Person, Work, Education, Certification, Overview, Skill, Project, User } = require("../models");
const Profilepic = require("../models/profilepic");
const { route } = require("./api");
const router = require("express").Router();
var fs = require('fs');
const path = require("path")

router.get("/dashboard", async (req, res) => {

  const dbData = await User.findByPk(req.session.user_id, {
    include: [{ model: Overview }, { model: Person }, { model: Work }, { model: Education }, { model: Project }, { model: Certification },{model:Skill},{model : Profilepic}]
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


router.post("/dashboard/pic", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files) === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const sampleFile = req.files.profile_picture;
    console.log(sampleFile);

    const uploadPath = __dirname +  '/../public/' + sampleFile.name ;
    console.log(uploadPath);

    await sampleFile.mv(uploadPath);

    const profilepic = {
      user_id: req.session.user_id,
      filename: sampleFile.name,
    };

    const existingPic = await Profilepic.findOne({
      where: { user_id: req.session.user_id }
    });
    
    if (existingPic) {
      const updatedPic = await existingPic.update({
        filename: req.files.profile_picture.name
      });
    }


    await Profilepic.create(profilepic);

    res.send("File uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving file details to database.");
  }
});


router.delete("/dashboard/pic", async (req, res) =>{
  try {
    const userId = req.session.user_id;
    const profilepic = await Profilepic.findByPk(req.session.user_id);
  console.log(profilepic)
    if (!profilepic) {
      return res.status(404).send("Profile picture not found");
    }

    const filename = profilepic.filename;
    const filepath = path.join(__dirname + '/../public/' +  filename)
    console.log(filepath)
    fs.unlinkSync(filepath);
    await profilepic.destroy();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
