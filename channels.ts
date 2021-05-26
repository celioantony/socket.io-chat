export default class Socket {

  clients: Array<any> [];
  io: any;

  constructor(io: any) {
    this.io = io;
    this.clients = [];
  }

  init() {
    // Define Socket.IO
    this.io.on('connection', (socket: any) => {
      console.log('User connected!');

      // Enter chat
      socket.on('join', (user: any) => {
        socket.username = user.username;
        this.clients.push(socket); // add client
        socket.emit('login', { size: this.clients.length }); // count users in socket
        socket.broadcast.emit('joined', {  // inform that user joined in chat
          username: socket.username, 
          size: this.clients.length 
        });

      });

    });
  }
}