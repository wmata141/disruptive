import fs from 'fs';
import Content from '../models/contentModel.js';

export const getAllContent = async (req, res) => {
  try {
    // Get all categories from the database
    const categories = await Content.find().populate('theme').populate('user');

    // Send a response to the client
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while obtaining the categories' });
  }
};

export const getContentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Search a content by id in the database
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Send a response to the client
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while obtaining the content' });
  }
};

export const postContent = async (req, res) => {
  try {
    const { name, description, theme, user, video } = req.body;

    // Check if a content with the same name already exists
    const existingContent = await Content.findOne({ name });
    if (existingContent) {
      return res.status(400).json({ message: 'There is already a content with the same name' });
    }

    // Get file names if they exist
    let filenames = [];
    if (req.files) {
      req.files.forEach(element => {
        filenames.push(element.filename)
      });
    }

    // Create a new content
    const newContent = new Content({ name, description, filenames, theme, user, video });
    await newContent.save();

    // Send a response to the client
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while registering the content' });
  }
};

export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, theme, video } = req.body;

    // Search a content by id in the database
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Check if a content with the same name already exists
    const existingContent = await Content.find({ name });
    if (existingContent.length > 1) {
      return res.status(404).json({ message: 'There is already a content with the same name' });
    }

    // Get file name if it exists to be delete    
    let filenames = [];
    if (req.files.length > 0) {

      for (let index = 0; index < req.files.length; index++) {
        const element = req.files[index].filename;
        filenames.push(element)
      }

      try {
        for (let index = 0; index < content.filenames.length; index++) {
          const element = content.filenames[index];
          if (element) {
            fs.unlinkSync(`./uploads/${element}`);
          }
        }
      } catch (fsError) {
        // console.error("updateContent fsError ", fsError);
      }
    }

    // Update content data
    if (name) content.name = name;
    if (description) content.description = description;
    if (theme) content.theme = theme;
    if (filenames.length > 0) content.filenames = filenames;
    if (video) content.video = video;

    await content.save();

    // Send a response to the client
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the content' });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    // Search a content by its id in the database
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Delete file
    try {
      for (let index = 0; index < content.filenames.length; index++) {
        const element = content.filenames[index];
        if (element) {
          fs.unlinkSync(`./uploads/${element}`);
        }
      }
    } catch (fsError) {
      // console.error("updateContent fsError ", fsError);
    }

    // Delete the content from the database
    await content.deleteOne();

    // Send a response to the client
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the content' });
  }
};
