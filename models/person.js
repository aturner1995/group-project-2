const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');



class Person extends Model {}

Person.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        githubProfile: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        linkedin: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        portfolio: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'person',
        
      }
      );

 
      module.exports = Person
    

