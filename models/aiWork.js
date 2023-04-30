const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AiWork extends Model { }

AiWork.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
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
    modelName: 'aiwork',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  });

module.exports = AiWork;
