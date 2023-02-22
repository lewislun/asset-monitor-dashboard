import expresss from 'express'
import { UserRole } from 'asset-monitor'

/**
 * @param {expresss.Request} req
 * @param {expresss.Response} res
 * @param {expresss.NextFunction} next
 */
export function ensureLoggedIn(req, res, next) {
	if (!req.user) return res.redirect('/auth/login')
	next()
}

/**
 * @param {UserRole[]} permittedRoles
 * @returns {expresss.Handler}
 */
export function restrictRole(permittedRoles = []) {
	return (req, res, next) => {
		if (!req.user) return res.redirect('/auth/login')
		if (!permittedRoles.includes(req.user.role)) return res.status(403).send()
		next()
	}
}