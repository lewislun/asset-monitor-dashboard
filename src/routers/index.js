import express from 'express'

import env from '../env.js'
import dashboardRouter from './dashboard.js'

// Routes
const rootRouter = express.Router()
rootRouter.use('/public', express.static(env.PUBLIC_FOLDER_PATH))
rootRouter.use('/dashboard', dashboardRouter)

// Redirect to root page
rootRouter.get('/', (req, res) => res.redirect('/dashboard'))

export default rootRouter