import express from 'express';
import cors from 'cors';
import { v1 } from './v1';
import 'dotenv/config';
import { authenticate } from './middlewares/authenticate';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authenticate());

app.use('/v1/product', v1);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
