'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request.init({
    code: DataTypes.STRING,
    subject: DataTypes.TEXT,
    requesttype_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    main_stage_id: DataTypes.INTEGER,
    enable: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};