const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');


class Work extends Model {}


Work.init( {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
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
    responsibility:{
      type :DataTypes.TEXT,
      allowNull: false
    },
    workUser : {
        type:DataTypes.INTEGER,
        references: {
            model : "person",
            id : "id"
        }
        
      }
  }, 
  {
    sequelize,
    modelName: 'Work',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  });


module.exports = Work;
