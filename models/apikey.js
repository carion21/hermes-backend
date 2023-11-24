'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApiKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ApiKey.init({
    code: DataTypes.STRING,
    key: DataTypes.TEXT,
    application_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    enable: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ApiKey',
  });
  return ApiKey;
};