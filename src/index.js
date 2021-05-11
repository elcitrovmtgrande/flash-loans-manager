import express from 'express';
import cors from 'cors';
import { CRYPTOS } from './config';
import { StrategyManager } from './StrategyManager';
// import { Pair } from './Pair';

const strategies = [];

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(cors());

app.use(express.json());

app.get('/api/cryptos', (req, res) => {
  res.json(CRYPTOS);
});

app.post('/api/strategy', async (req, res) => {
  const { pair } = req.body;
  console.log('req.body', req.body);
  try {
    const newStrategy = new StrategyManager(pair, io);
    newStrategy.exec();
    strategies.push(newStrategy);
    res.json({ message: 'Strategy created !', strategyId: newStrategy.id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

http.listen(5000, '127.0.0.1');

// const strategy = new StrategyManager(['WETH', 'USDT'], io);

// strategy.exec();
