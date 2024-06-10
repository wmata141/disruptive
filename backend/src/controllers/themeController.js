import Theme from '../models/themeModel.js';

export const getAllTheme = async (req, res) => {
  try {
    // Get all themes from the database
    const categories = await Theme.find();

    // Send a response to the client
    res.status(200).json(categories);
  } catch (error) {    
    res.status(500).json({ message: 'An error occurred while obtaining the themes' });
  }
};

export const getThemeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Search a theme by id in the database
    const theme = await Theme.findById(id);
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    // Send a response to the client
    res.status(200).json(theme);
  } catch (error) {    
    res.status(500).json({ message: 'An error occurred while obtaining the theme' });
  }
};

export const postTheme = async (req, res) => {
  try {
    const { name, description, permission } = req.body;

    // Check if a category with the same name already exists
    const existingTheme = await Theme.findOne({ name });
    if (existingTheme) {
      return res.status(400).json({ message: 'There is already a theme with the same name' });
    }

    // Create a new theme
    const newTheme = new Theme({ name, description, permission });
    await newTheme.save();

    // Send a response to the client
    res.status(201).json(newTheme);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while registering the theme' });
  }
};

export const updateTheme = async (req, res) => {  
  try {
    const { id } = req.params;
    const { name, description, permission } = req.body;

    // Search a theme by id in the database
    const theme = await Theme.findById(id);
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    // Check if a category with the same name already exists
    const existingTheme = await Theme.find({ name });
    if (existingTheme.length > 1) {
      return res.status(404).json({ message: 'There is already a theme with the same name' });
    }

    // Update theme data
    if (name) theme.name = name;
    if (description) theme.description = description;
    if (permission) theme.permission = permission;

    await theme.save();

    // Send a response to the client
    res.status(200).json(theme);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the theme' });
  }
};

export const deleteTheme = async (req, res) => {
  try {
    const { id } = req.params;

    // Search a theme by id in the database
    const theme = await Theme.findById(id);
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    // Delete the theme from the database
    await theme.deleteOne();

    // Send a response to the client
    res.status(200).json(theme);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the theme' });
  }
};
