/**
 * Import all modules
 */
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Config from './config';
import Channels from './channels';
import Services from './services';

declare global {
  namespace NodeJS {
    interface Global {
      clients: Array<any>;
    }
  }
}

export default class Application {

  app: any = express();
  server: any = createServer(this.app);
  io: any = new Server(this.server, { cors: { origin: '*', credentials: false }});
  clients: Array<any> = [];

  constructor() {
    // Load config middleware
    let config = new Config(this.app);
    config.init();
    // Load services
    let services = new Services(this.app);
    services.init();
    this.app.use('/api', services.router);
    // Load channels
    let channels = new Channels(this.io);
    channels.init();

    // Define server port
    const PORT = 3000;
    this.server.listen(PORT, () => {
      console.log('=======================');
      console.log('... Server started ...');
      console.log(`Running in port: ${PORT}`);
      console.log('Application: Socket.IO Chat')
      console.log('=======================');
    });
  }
}

module.exports = new Application();