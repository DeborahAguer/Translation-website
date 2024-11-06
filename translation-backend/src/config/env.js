// // config/env.js
// const dotenv = require('dotenv');

// // Load variables from `.env` file
// dotenv.config();

// const env = process.env.NODE_ENV || 'development';

// module.exports = {
//   NODE_ENV: env,
//   PORT: process.env.PORT || 3000,
//   DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/translation_dev',
//   LOG_LEVEL: process.env.LOG_LEVEL || (env === 'production' ? 'info' : 'debug'),
//   SUPPORTED_LANGUAGES: process.env.SUPPORTED_LANGUAGES 
//     ? process.env.SUPPORTED_LANGUAGES.split(',') 
//     : ['kiswahili', 'dinka', 'english'],
// };