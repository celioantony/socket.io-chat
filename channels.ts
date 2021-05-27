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

      // Send message
      socket.on('messages', (message: any) => {
        socket.broadcast.emit('messages', {
          username: socket.username,
          message: message.content,
          datetime: message.datetime
        });
      });

      // Typing a message
      socket.on('typing', () => {
        socket.broadcast.emit('typing', {
          username: socket.username
        });
      });

      // Disconnect
      socket.on('disconnect', () => {
        let id = socket.id;
        let index = this.clients.findIndex((cli: any) => cli.id == id);
        if (index > -1)
          this.clients.splice(index, 1);

        socket.broadcast.emit('disconnect', {
          username: socket.username,
          size: this.clients.length
        });
      });

    });
  }
}