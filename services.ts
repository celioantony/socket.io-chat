import { Express, Router } from 'express';

export default class Services {

  public app: any = null;
  public router = Router();

  constructor(app: Express) {
    this.app = app;
  }

  init() {
    // Get online users
    this.router.get('/onlineUsers', (req, res) => {
      let onlineUsers = global.clients.map(socket => (
        { 
          username: socket.username,
          datetime: socket.datetime
        }
      ));
      return res.json(onlineUsers);
    });
  }

}