import expresss from 'express'
import { UserRole } from 'asset-monitor'

/**
 * @param {object} [opts={}]
 * @param {UserRole[]} [opts.permittedRoles=[]]
 * @returns {expresss.Handler}
 */
export function checkAuth(opts = {}) {
	return (req, res, next) => {
		console.log(req.user, opts.permittedRoles)
		// check if logged in
		if (!req.user) {
			req.session.returnTo = req.originalUrl
			console.log('url', req.originalUrl)
			res.redirect('/auth/login')
			return
		}
		
		// check roles
		if (opts?.permittedRoles && !opts.permittedRoles.includes(req.user?.role)) {
			return res.status(403).send()
		}

		next()
	}
}