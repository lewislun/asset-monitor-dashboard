import express from 'express'
import { UserRole, AssetGroup } from 'asset-monitor'

import * as middlewares from '../middlewares/index.js'

const router = express.Router()
router.use(middlewares.checkAuth({ permittedRoles: [ UserRole.OWNER, UserRole.OPERATOR ] }))

router.get('/', async (req, res) => {
	const groups = await AssetGroup.query()
	res.render('pages/operation', { groups })
})

export default router