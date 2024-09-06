import { Router } from 'express';

const router = Router();

router.get('/', (rq, rs) => {
	rs.send({ data: 1 })
});

export default router;