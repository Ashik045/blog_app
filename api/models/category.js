/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

// create post model
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
