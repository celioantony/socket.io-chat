'use strict'

/**
 * Import all modules
 */
const express = require('express');
const config = require('./config');
const app = express();

// Load config middleware
config(app);

// Define server port
const PORT = 3000;
app.listen(PORT, () => {
  console.log('=======================');
  console.log('... Server started ...');
  console.log(`Running in port: ${PORT}`);
  console.log('Application: Socket.IO Chat')
  console.log('=======================');
});
