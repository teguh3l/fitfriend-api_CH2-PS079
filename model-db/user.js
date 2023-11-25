const mongoose = require('mongoose');

// Membuat schema
const User = mongoose.model('User', {
	uid: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
	},
});

module.exports = User;
