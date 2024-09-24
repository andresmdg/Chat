// Modules

import { Router } from 'express'

// Variables
const router = Router()

// Routes
router.get('/', (rq, rs) => {
  rs.send({ data: 1 })
})

export default router
