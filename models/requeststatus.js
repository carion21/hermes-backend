'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RequestStatus.init({
    code: DataTypes.STRING,
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    enable: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RequestStatus',
  });
  return RequestStatus;
};