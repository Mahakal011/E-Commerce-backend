const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Order extends Model {
  static associate(models) {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      as: 'items'
    });
  }
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
        model: 'Users',
        key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM,
    values: ['CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    defaultValue: 'CONFIRMED',
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},{
  sequelize,
  modelName: 'Order',
  tableName: 'Orders',
  timestamps: false
});

module.exports = Order;