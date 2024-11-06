// routes/translationRoutes.js
const express = require('express');
const translationController = require('../controllers/translationController');
const authMiddleware = require('../middleware/authMiddleware'); // JWT authentication middleware

const router = express.Router();

// Public route to search or view translations
router.get('/search', translationController.searchTranslation);

// Protected route to add a new translation (only accessible to logged-in users)
router.post('/add', authMiddleware, translationController.addTranslation);

module.exports = router;
