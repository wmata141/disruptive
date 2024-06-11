import fs from 'fs';
import Category from '../models/categoryModel.js';

export const getAllCategory = async (req, res) => {
  try {
    // Get all categories from the database
    const categories = await Category.find();

    // Send a response to the client
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while obtaining the categories' });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Search a category by id in the database
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Send a response to the client
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while obtaining the category' });
  }
};

export const postCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Get file name if it exists
    let filename = null;
    if (req.file) {
      filename = req.file.filename;
    }

    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'There is already a category with the same name' });
    }

    // Create a new category
    const newCategory = new Category({ name, description, filename });
    await newCategory.save();

    // Send a response to the client
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while registering the category' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Search a category by id in the database
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if a category with the same name already exists
    const existingCategory = await Category.find({ name });
    if (existingCategory.length > 1) {
      return res.status(404).json({ message: 'There is already a category with the same name' });
    }

    // Get file name if it exists to be delete
    let filename = null;
    if (req.file) {
      filename = req.file.filename;

      try {
        if (category.filename) {
          fs.unlinkSync(`./uploads/${category.filename}`);
        }
      } catch (fsError) {
        console.error("updateCategory fsError ", fsError);
      }
    }

    // Update category data
    if (name) category.name = name;
    if (description) category.description = description;
    if (filename) category.filename = filename;

    await category.save();

    // Send a response to the client
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the category' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Search a category by its id in the database
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Delete file
    try {
      if (category.filename) {
        fs.unlinkSync(`./uploads/${category.filename}`);
      }
    } catch (fsError) {
      console.error("deleteCategory fsError :", fsError);
    }

    // Delete the category from the database
    await category.deleteOne();

    // Send a response to the client
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the category' });
  }
};
