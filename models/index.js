const Person = require("./person");
const Education = require("./education");
const Overview = require("./overview");
const Skill = require("./skill");
const Work = require("./work");
const Certification = require("./cerification");
const Project = require("./project");

Person.hasMany(Skill, { foreignKey: "skillUser" });
Skill.belongsTo(Person, { foreignKey: "skillUser" });

Person.hasMany(Work, { foreignKey: "workUser" });
Work.belongsTo(Person, { foreignKey: "workUser" });

Person.hasMany(Education, { foreignKey: "educationUser" });
Education.belongsTo(Person, { foreignKey: "educationUser" });

Person.hasMany(Certification, { foreignKey: "certicationUser" });
Certification.belongsTo(Person, { foreignKey: "certicationUser" });

Overview.belongsTo(Person, { foreignKey: 'overviewUser' });
Person.hasOne(Overview, { foreignKey: 'overviewUser' });



Person.hasMany(Project, { foreignKey: "userProject" });
Project.belongsTo(Person, { foreignKey: "userProject" });


module.exports = {Person,Work,Education,Certification,Overview ,Skill,Project,Work}