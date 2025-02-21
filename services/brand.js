const Brand = require('../models/brand');

const createBrand = async(brand) => {
    try{
        await Brand.create(brand);
        console.log('Brand created successfully');
        return brand;
    }
    catch(error){
        console.error('Error creating Product:', error);
        throw error;
    }
};

const getBrand = async(id) => {
    try {
        const brand = await Brand.findByPk(parseInt(id));
        if (!brand) {
            throw new Error('Brand not found');
        }
        return brand;
    }
    catch(error){
        console.error('Error fetching Brand:', error);
        throw error;
    }
};

const getAllBrands= async() => {
    try{
        const brand = await Brand.findAll();
        if (!brand) {
            throw new Error('Brand not found');
        }
        return brand;
    }catch(error){
        console.error('Error fetching Brand:', error);
        throw error;
    }
};

const updateBrand = async(id, brandData) => {
    try{
        const brand = await Brand.findByPk(id);
        if (!brand) {
            throw new error('Brand not found');
        }
        await brand.update(brandData);
        console.log('Brand updated successfully.');
        return brand;
    }catch(error){
        console.error('Error updating Brand:', error);
        throw error;
    }
};

const deleteBrand = async(id) => {
    try{
        const brand = await Brand.findByPk(id);
        if(!brand){
            throw new Error('Brand not found');
        }
        await brand.destroy();
        console.log('Brand deleted successfully.');

    }catch(error){
        console.error('Error deleting Brand:', error);
        throw error;
    }

};

module.exports ={
    createBrand,
    getBrand,
    getAllBrands,
    updateBrand,
    deleteBrand
};