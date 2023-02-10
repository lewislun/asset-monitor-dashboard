import express from 'express'

import dashboardRouter from './dashboard.js'

const rootRouter = express.Router()
rootRouter.use('/dashboard', dashboardRouter)

// root page
rootRouter.get('/', (req, res) => res.redirect('/dashboard'))

// ping
rootRouter.get('/ping', async (req, res) => res.send('pong'))

export default rootRouter