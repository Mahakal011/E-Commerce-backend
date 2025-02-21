const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class OrderItem extends Model {
  static associate(models) {
    OrderItem.belongsTo(models.Order, { 
        foreignKey: 'orderId',
        as: 'order'
    });
  }
}

OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
        model: 'Products',
        key: 'id'
    }
  },
  quantity : {
    type: DataTypes.INTEGER,
    defaultValue : 1
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
        model: 'Orders',
        key: 'id'
    }
  }
},{
  sequelize,
  modelName: 'OrderItem',
  tableName: 'OrderItems',
  timestamps: false
});

module.exports = OrderItem;