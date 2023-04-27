const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Education extends Model {}

Education.init( {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
school: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  degree: {
    type: DataTypes.STRING,
    allowNull: false,
  },


  startDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  educationdetail: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  educationUser : {
    type:DataTypes.INTEGER,
    references: {
        model : "person",
        id : "id"
    }
    
  }
}, {
    sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'education',
});

module.exports = Education;
