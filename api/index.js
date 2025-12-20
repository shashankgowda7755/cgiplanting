// Vercel serverless function entry point
const path = require('path');

// Import the built server
const app = require(path.join(__dirname, '..', 'dist', 'index.cjs'));

// Export for Vercel
module.exports = app;
