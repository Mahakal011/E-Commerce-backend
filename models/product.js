const { Model ,DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model{
    static associate(models){
        Product.belongsTo(models.Category, { 
            foreignKey: 'categoryId',
            as: 'category'
        });
        Product.belongsTo(models.Brand, {
            foreignKey: 'brandId',
            as: 'brand'
        } ) 
    }
}


Product.init ({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },    
    brandId:{
        type:DataTypes.INTEGER,
        references: {
            model: 'Brands',
            key: 'id'
        }
    }
},{
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: false
});


module.exports = Product;
