const Category = require('../models/category');

const createCategory = async (req, res) => {
    try {
        const newCategory = await new Category(req.body);
        newCategory.save();

        res.status(200).json({
            message: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};

// get all category
const getAllCat = async (req, res) => {
    try {
        const cats = await Category.find();

        res.status(200).json({
            message: cats,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};

module.exports = { createCategory, getAllCat };
