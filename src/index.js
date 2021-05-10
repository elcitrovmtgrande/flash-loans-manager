import express from 'express';
import socketIO from 'socket.io';
import { PORT } from './config';
// import Pair from './Pair';
import watcher from './watcher';

const app = express();

app.use('/app', express.static('./src/frontend'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(3000, '127.0.0.1');

// app.listen(PORT, () => console.log(`Server listning to http://localhost:${PORT}`));

// const io = require('socket.io').listen(server);
// new Pair(['WETH', 'DAI']).watch();

watcher(['WETH', 'DAI'], io);
