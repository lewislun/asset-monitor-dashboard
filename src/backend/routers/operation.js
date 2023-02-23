import express from 'express'
import { UserRole } from 'asset-monitor'

import * as middlewares from '../middlewares/index.js'

const router = express.Router()
router.use(middlewares.checkAuth({ permittedRoles: [ UserRole.OWNER, UserRole.OPERATOR ] }))

router.get('/', async (req, res) => {
	res.render('pages/operation')
})

export default router