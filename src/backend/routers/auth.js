import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from 'asset-monitor'

import { createLogger } from '../utils/index.js'

const logger = createLogger('auth')

// Passport
passport.use('local', new Strategy((username, password, cb) => {
	logger.debug(`Logging in as '${username}'.`)
	User.login(username, password)
		.then(user => cb(null, user))
		.catch(err => cb(err))
}))

// Serialize user object to store in session
passport.serializeUser((user, cb) => {
	process.nextTick(() => {
		cb(null, { id: user.id, username: user.name })
	})
})

// Deserialize user from session
passport.deserializeUser((sessionUser, cb) => {
	process.nextTick(async () => {
		try {
			const user = await User.query().findById(sessionUser.id)
			cb(null, user)
		} catch (err) {
			cb(err)
		}
	})
})

const router = express.Router()

// Redirect to Login Page
router.get('/', (req, res) => res.redirect(req.originalUrl + '/login'))

// Login Page
router.get('/login', async (req, res) => {
	res.render('pages/login')
})

// POST login
router.post(
	'/login',
	passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: 'login', failureMessage: true, keepSessionInfo: true }),
)


export default router