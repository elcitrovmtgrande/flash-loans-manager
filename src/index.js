import express from 'express';
import cors from 'cors';
import { CRYPTOS } from './config';
import { StrategyManager } from './StrategyManager';

const app = express();

app.use(cors());

app.get('/api/cryptos', (req, res) => {
  res.json(CRYPTOS);
});

const http = require('http').createServer(app);

const io = require('socket.io')(http);

http.listen(5000, '127.0.0.1');

const strategy = new StrategyManager(['WETH', 'USDT'], io);

strategy.exec();
