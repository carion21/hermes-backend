'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestEvolution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RequestEvolution.init({
    request_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    operator_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RequestEvolution',
  });
  return RequestEvolution;
};