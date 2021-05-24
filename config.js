'use strict'

const express = require('express');
const cors = require('cors');
const path = require('path');

module.exports = (app) => {

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Static files
  app.use('/', express.static(`${path.dirname(path.join(__dirname, '..'))}/public`));

}