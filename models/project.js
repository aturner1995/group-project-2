const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model { }

Project.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  yourRole: {
    type: DataTypes.STRING,
    allowNull: false
  },
  githuburl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  githubrepo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  responsibility: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  }
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "project",
  }
);


module.exports = Project