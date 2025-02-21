const Category = require('../models/category');

const createCategory = async(category) => {
    try{
        await Category.create(category);
        console.log('Category created successfully');
        return category;
    }
    catch(error){
        console.error('Error creating Product:', error);
        throw error;
    }
};

const getCategory = async(id) => {
    try {
        const category = await Category.findByPk(parseInt(id));
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }
    catch(error){
        console.error('Error fetching Category:', error);
        throw error;
    }
};

const getAllCategory = async() => {
    try{
        const category = await Category.findAll();
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }catch(error){
        console.error('Error fetching Category:', error);
        throw error;
    }
};

const updateCategory = async(id, categoryData) => {
    try{
        const category = await Category.findByPk(id, categoryData);
        if (!category) {
            throw new error('Category not found');
        }
        await category.update(categoryData);
        console.log('Category updated successfully.');
        return category;
    }catch(error){
        console.error('Error updating Category:', error);
        throw error;
    }
};

const deleteCategory = async(id) => {
    try{
        const category = await Category.findByPk(id);
        if(!category){
            throw new Error('Category not found');
        }
        await category.destroy();
        console.log('Category deleted successfully.');

    }catch(error){
        console.error('Error deleting Category:', error);
        throw error;
    }

};

module.exports ={
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
};