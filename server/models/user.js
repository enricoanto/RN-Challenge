'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email:{
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email must be in email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "Password at least 6 characters"
        }
      }}
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
        console.log(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};