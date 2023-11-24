'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserToken.init({
    token: DataTypes.TEXT,
    expiration: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    apikey_id: DataTypes.INTEGER,
    enable: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserToken',
  });
  return UserToken;
};