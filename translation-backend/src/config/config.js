require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';

let envConfig;
try {
  envConfig = require(`./env/${environment}`);
} catch (error) {
  console.error(`Could not load config for ${environment}. Falling back to default.`);
  envConfig = {}; // fallback or handle error
}

module.exports = {
  ...envConfig,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SUPPORTED_LANGUAGES: ['kiswahili', 'dinka', 'english'],
};
