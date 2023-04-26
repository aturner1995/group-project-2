
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class Project extends Model {}
Project.init( {
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  yourRole: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  responsibility: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userProject: {
    type: DataTypes.INTEGER,
    references:{
        model:"Person",
        key :"id"
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