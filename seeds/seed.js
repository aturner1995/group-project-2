const sequelize = require('../config/connection');
const { User, Person, Overview, Certification, Education, Project, Skill, Work } = require('../models');

const userData = require('./userData.json');
const personData = require('./personseed.json');
const overviewData = require('./overviewData.json');
const certificationData = require('./certificationData.json');
const educationData = require('./educationData.json');
const projectData = require('./projectData.json');
const skillData = require('./skillData.json');
const workData = require('./workData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    const person = await Person.bulkCreate(personData);

    const overview = await Overview.bulkCreate(overviewData);

    const certification = await Certification.bulkCreate(certificationData);

    const education = await Education.bulkCreate(educationData);

    const project = await Project.bulkCreate(projectData);

    const skill = await Skill.bulkCreate(skillData);

    const work = await Work.bulkCreate(workData);

    process.exit(0);
}

seedDatabase();
