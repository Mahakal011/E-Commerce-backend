const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
  static associate(models) {
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true

  },
  mobile:{
    type: DataTypes.STRING,
    allowNull: false

  },
  password:{
    type: DataTypes.STRING,
    allowNull: false

  }
},{
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: false
});

module.exports = User;