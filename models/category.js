const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'products'
    });
  }
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
},{
  sequelize,
  modelName: 'Category',
  tableName: 'Categories',
  timestamps: false
});

module.exports = Category;