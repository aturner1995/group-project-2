
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');





class Overview extends Model {}

Overview.init({

id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  overviewUser : {
    type:DataTypes.INTEGER,
    references: {
        model : "person",
        id : "id"
    },
    allowNull: false,
  }
}, 
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  modelName: 'overview',
  underscored: true,
});

module.exports = Overview