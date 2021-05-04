import express from 'express';
import { PORT } from './config';

const app = express();

app.listen(PORT, () => console.log(`Server listning to http://localhost:${PORT}`));
