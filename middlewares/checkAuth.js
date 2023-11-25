const admin = require('firebase-admin');

const checkUserAuth = (req, res, next) => {
	const sessionCookie = req.cookies.session || '';
	admin
		.auth()
		.verifySessionCookie(sessionCookie)
		.then((userData) => {
			req.user = userData;
			next();
		})
		.catch((error) => {
			console.error('Error verifying session cookie:', error);
			res.redirect('/');
		});
};

module.exports = checkUserAuth;
