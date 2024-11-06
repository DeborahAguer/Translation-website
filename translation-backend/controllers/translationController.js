// controllers/translationController.js
const Translation = require('/models/Translation'); // Importing Translation model
const mongoose = require('mongoose');

// Add a new translation (protected route for logged-in users)
exports.addTranslation = async (req, res) => {
  try {
    const { wordOriginal, wordTranslated, languageFrom, languageTo } = req.body;

    // Create a new translation entry with the logged-in user's ID
    const newTranslation = new Translation({
      wordOriginal,
      wordTranslated,
      languageFrom,
      languageTo,
      createdBy: req.user.userId, // User ID from decoded JWT
    });

    await newTranslation.save();
    res.status(201).json({ message: 'Translation added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during translation addition.' });
  }
};

// View or search for translations (public access)
exports.getTranslations = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { wordOriginal: new RegExp(search, 'i') },
          { wordTranslated: new RegExp(search, 'i') }
        ],
      };
    }

    const translations = await Translation.find(query).populate('createdBy', 'username'); // Populate with username of creator
    res.json(translations);
  } catch (error) {
    res.status(500).json({ message: 'Server error during translation retrieval.' });
  }
};
