import express from 'express';
import { CRYPTOS } from './config';
import { StrategyManager } from './StrategyManager';
import { Pair } from './Pair';

const app = express();

app.get('/api/cryptos', (req, res) => {
  res.json(CRYPTOS);
});

app.post('/api/pair', async (req, res) => {
  const { Pair } = req.body;
  if (Pair) {

  } else {
    res.json({ message: 'Dont forgat da pair noob' });
  }
});

const http = require('http').createServer(app);

const io = require('socket.io')(http);

http.listen(5000, '127.0.0.1');

const strategy = new StrategyManager(['WETH', 'USDT'], io);

strategy.exec();
