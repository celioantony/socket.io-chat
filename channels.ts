export default class Channels {

  io: any;

  constructor(io: any) {
    this.io = io;
    global.clients = [];
  }

  init() {
    // Define Socket.IO
    this.io.on('connection', (socket: any) => {
      console.log('User connected!');

      // Enter chat
      socket.on('join', (user: any) => {
        socket.username = user.username;
        global.clients.push(socket); // add client
        socket.broadcast.emit('joined', {  // inform that user joined in chat
          username: socket.username,
          size: global.clients.length
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
        let index = global.clients.findIndex((cli: any) => cli.id == id);
        if (index > -1)
        global.clients.splice(index, 1);

        // socket.broadcast.emit('disconnect', {
        //   username: socket.username,
        //   size: this.clients.length
        // });
      });

    });
  }
}