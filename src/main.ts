import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import container from './container/Container';
import TYPES from './types/Types';
import { Routerable } from './routers/Router';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Khởi động router
const router = container.get<Routerable>(TYPES.Router);
router.start(app);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
