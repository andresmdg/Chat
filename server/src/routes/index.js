import { Router } from 'express';
// import authRouter from './auth.js';

// function routerApi(app) {
//   const router = express.Router();
//   app.use('/api/v1', router);
//   router.use('/auth', authRouter);
// }

const router = Router();

router.get('/', (rq, rs) => {
  rs.send({ data: 1 })
});

export default router;