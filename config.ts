'use strict'

const express = require('express');
const cors = require('cors');
const path = require('path');
import { Express, Router } from 'express';

export default class Config {

  public app: any = null;

  constructor(app: Express) {
    this.app = app;
  }

  init() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    // Static files
    this.app.use('/', 
      express.static(`${__dirname}/public`)
    );
  }
}