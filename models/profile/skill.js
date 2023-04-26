

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');



class Skill extends Model {}


Skill.init ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skillUser : {
        type:DataTypes.INTEGER,
        references: {
            model : "person",
            id : "id"
        }
        
      }
  },
   {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'skill'
  });
  

  module.exports = Skill