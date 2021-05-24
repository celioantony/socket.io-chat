/**
 * Import all modules
 */
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const io = new Server(new http.Server(app), {});

// Load config middleware
// config(app);

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
