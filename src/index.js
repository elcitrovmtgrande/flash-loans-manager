import express from 'express';
import { PORT } from './config';
// import Pair from './Pair';
import watcher from './watcher';

const app = express();

app.listen(PORT, () => console.log(`Server listning to http://localhost:${PORT}`));

// new Pair(['WETH', 'DAI']).watch();

watcher();
