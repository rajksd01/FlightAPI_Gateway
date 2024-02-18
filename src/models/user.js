"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const user_role = require("./user_role");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: "User_Roles", as: "role" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 50],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async function encrypt(user) {
    if (user.password) {
      const salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hashSync(user.password, salt);
    }
  });
  return User;
};
