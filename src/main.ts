// src/main.ts
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import container from './container/Container';
import TYPES from './types/Types';
import { Routerable } from './routers/Routerable';
import { ApiRouter } from './routers/ApiRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Khởi động API Router
const apiRouter = container.get<ApiRouter>(Symbol.for('ApiRouter'));
apiRouter.setupRoutes(app);

// Khởi động Router cho Frontend
const router = container.get<Routerable>(TYPES.Router);
router.start(app);

// Khởi động server
const PORT = process.env.PORT || 1340;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
