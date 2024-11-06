const environment = process.env.NODE_ENV || 'development';

// Load environment-specific configuration
const envConfig = require(`./env/${environment}`);

module.exports = {
  ...envConfig,
  // Add any additional configurations shared across environments here
  SUPPORTED_LANGUAGES: ['kiswahili', 'dinka', 'english'],
};
