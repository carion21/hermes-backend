'use strict';
const {
  Model
} = require('sequelize');
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
  }
  User.init({
    code: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    confirmation_token: DataTypes.TEXT,
    confirmation_code: DataTypes.STRING,
    confirmation_expiration: DataTypes.STRING,
    reset_token: DataTypes.TEXT,
    reset_code: DataTypes.STRING,
    reset_expiration: DataTypes.STRING,
    profile_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    enable: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};