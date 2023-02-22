import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from 'asset-monitor'

import env from '../../../env.js'
import { createLogger } from '../utils/index.js'

const logger = createLogger('auth')

// Passport
passport.use('local', new Strategy((username, password, cb) => {
	logger.debug(`Logging in as '${username}'.`)
	User.login(username, password)
		.then(user => { console.log(user); cb(null, user);})
		.catch(err => cb(err))
}))

// passport.serializeUser(function(user, cb) {
// 	process.nextTick(function() {
// 		cb(null, { id: user.id, username: user.name })
// 	})
// })

// passport.deserializeUser(function(user, cb) {
// 	process.nextTick(function() {
// 		return cb(null, user)
// 	})
// })

const router = express.Router()

// Redirect to Login Page
router.get('/', (req, res) => res.redirect(req.originalUrl + '/login'))

// Login Page
router.get('/login', async (req, res) => {
	res.render('pages/auth/login', { env })
})

// POST login
router.post(
	'/login',
	passport.authenticate('local', { failureRedirect: 'login', failureMessage: true }),
	(req, res) => {
		logger.debug(`Successfully logged in as '${req.body.username}'`)
		console.log(req.user)
		res.redirect('/')
	}
)


export default router