const Product = require('../models/product');
const { Op } = require('sequelize');

const createProduct = async (product) => {
    try {
        await Product.create(product);
        console.log('Product created successfully.');
        return product;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }finally {
        // await sequelize.close();
    }
};

// services
const getAllProducts = async (searchQuery = undefined, categoryId = undefined, brandIds = [], minRange = 0, maxRange = 100000) => {
  try {
    console.log('Received parameters:', { searchQuery, categoryId, brandIds, minRange, maxRange });
    const where = {
      [Op.and]: [
        {
          price: {
            [Op.gte]: minRange,
            [Op.lte]: maxRange
          }
        }
      ]
    };

    if (categoryId) {
      where[Op.and].push({ categoryId });
    }

    if (searchQuery) {
      where[Op.and].push({ 
        name: { [Op.like]: `%${searchQuery}%` }
      });
    }

    if (brandIds && brandIds.length > 0) {
      where[Op.and].push({
        brandId: {
          [Op.in]: brandIds
        }
      });
    }

    const products = await Product.findAll({
      where,
      
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// const getAllProducts = async (search=undefined, categoryId=undefined, brandId=[], minRange=0, maxRange=100000) => {
//   try {
//       var products = [];
//       if(search  && categoryId){
//           products = await Product.findAll({
//               where: {
//                   [Op.and]: [
//                       { name: { [Op.like]: `%${search}%` } },
//                       { categoryId: categoryId },
//                       { price: { [Op.gte]: minRange} },
//                       { price: { [Op.lte]: maxRange} },
                      
//                   ]
//           }});
//       }
//       else if(search){
//           products = await Product.findAll({
//               where: {
//                   [Op.and]: [
//                       { name: { [Op.like]: `%${search}%` } },
//                       { price: { [Op.gte]: minRange} },
//                       { price: { [Op.lte]: maxRange} },
//                   ]
//           }});
//       }
//       else if( categoryId){
//           products = await Product.findAll({
//               where: {
//                   [Op.and]: [
//                       { categoryId: categoryId },
//                       { price: { [Op.gte]: minRange} },
//                       { price: { [Op.lte]: maxRange} },
//                   ]
//           }});
//       }
//       else{
//           products = await Product.findAll({
//               where: {
//                   [Op.and]: [
//                       { price: { [Op.gte]: minRange} },
//                       { price: { [Op.lte]: maxRange} },
//                   ]
//           }});
//       }
//       return products;
//   } catch (error) {
//       console.error('Error creating product:', error);
//   }finally {
//       // await sequelize.close();
//   }
// };

const getProduct = async (id) => {
    try{
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
    catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

const updateProduct = async (id ,productData) => {
    try{
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }
        await product.update(productData);
        console.log('Product updated successfully.');
        return product;
    }
    catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};


const deleteProduct = async (id) => {
    try{
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }
        await product.destroy();
        return {message: 'Product deleted sucessfully'};
        }catch (error) {
            console.error('Error deleting product' , error);
            throw error;
        }
    };

module.exports = { createProduct,
                   getAllProducts,
                   getProduct, 
                   updateProduct, 
                   deleteProduct
                };