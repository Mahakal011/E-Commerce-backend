var express = require('express');
var router = express.Router();
const {createCategory, getCategory ,getAllCategory, updateCategory, deleteCategory} =require('../services/category');

router.post('/category', async function(req, res) {
    try{
        const category = await createCategory(req.body);
     res.status(201).send('Category created successfully');

    }catch(error){
        res.status(500).send('Error creating category');
    }
    
});

router.get('/category/:id', async function(req, res) {
    const category = await getCategory(req.params.id);
    res.status(200).json(category);
});

router.get('/category', async function(req, res) {
    const category = await getAllCategory();
    res.status(200).json (category);
});

router.put('/category/:id', async function(req, res) {
    const category = await updateCategory(req.params.id, req.body);
    res.status(200).send('Category updated successfully');
});

// router.delete('./category/:id', async function(req, res) {
//     const category = await deleteCategory(req.params.id);
//     res.status(200).json('Category deleted successfully');
// });

router.delete('/category/:id', async (req, res) => {
    try {
        await deleteCategory(req.params.id);
        res.status(200).json("Category deleted successfully.");
    } catch (error) {
        if (error.message.includes('Category not found')) {
            return res.status(404).json({ error: error.message });
        }
        if (error.name == "SequelizeForeignKeyConstraintError") {
            return res.status(404).json({ error: 'This category can not be deleted, because it is being used by many products.' });
        }       
        
        res.status(500).json({ error: 'Internal server error while deleting category' 
        });
    }
});


module.exports = router;