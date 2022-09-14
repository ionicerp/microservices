import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { authenticate } from './middlewares/authenticate';
import { v1Routes } from './routes/v1.routes';

const app = express();

app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authenticate());

app.use('/v1', v1Routes);

const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
