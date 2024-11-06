module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/translation_prod',
    LOG_LEVEL: 'info', // Less verbose logging for production
  };
  