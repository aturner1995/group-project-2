const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Certification extends Model {}

Certification.init(
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
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateEarned: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expireDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certicationUser: {
      type: DataTypes.INTEGER,
      references: {
        model: "person",
        id: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "certification",
  }
);

module.exports = Certification;
