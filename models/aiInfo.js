const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AiInfo extends Model { }

AiInfo.init({

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  overview: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  responsibility: {
    type: DataTypes.JSON,
    allowNull: false,
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
    modelName: 'aiinfo',
    underscored: true,
  });

module.exports = AiInfo;
