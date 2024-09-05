import express from 'express';
import authRouter from './auth.js';

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
}

export default routerApi;