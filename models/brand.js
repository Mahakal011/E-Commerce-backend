const { Model , DataTypes} = require('sequelize')
const sequelize = require('../config/database');

class Brand extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: 'brandId',
      as : 'products'
    });
  }
}

Brand.init ({
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
    modelName: 'Brand',
    tableName: 'Brands',
    timestamps: false
  });
module.exports = Brand;