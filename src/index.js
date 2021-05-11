import express from 'express';
import { CRYPTOS } from './config';
import { StrategyManager } from './StrategyManager';

const app = express();

app.get('/cryptos', (req, res) => {
  res.json(CRYPTOS);
});

app.use('/app', express.static('./src/frontend'));

const http = require('http').createServer(app);

const io = require('socket.io')(http);

http.listen(5000, '127.0.0.1');

const strategy = new StrategyManager(['WETH', 'USDT'], io);

strategy.exec();
