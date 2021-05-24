/**
 * Import all modules
 */
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ApplicationConfig from './ApplicationConfig';

const app = express();
const io = new Server(new http.Server(app), {});

export default class Application {
  constructor() {
    // Load config middleware
    let config = new ApplicationConfig(app);
    config.init();

    // Define Socket.IO
    io.on('connection', (socket) => {
      console.log('User connected!');
    });

    // Define server port
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log('=======================');
      console.log('... Server started ...');
      console.log(`Running in port: ${PORT}`);
      console.log('Application: Socket.IO Chat')
      console.log('=======================');
    });
  }
}

module.exports = new Application();