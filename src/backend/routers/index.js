import express from 'express'

import env from '../../../env.js'
import authRouter from './auth.js'
import dashboardRouter from './dashboard.js'
import operationRouter from './operation.js'

// Routes
const rootRouter = express.Router()
rootRouter.use('/public', express.static(env.PUBLIC_FOLDER_PATH))
rootRouter.use('/auth', authRouter)
rootRouter.use('/dashboard', dashboardRouter)
rootRouter.use('/operation', operationRouter)

// Redirect to root page
rootRouter.get('/', (req, res) => res.redirect('/dashboard'))

export default rootRouter