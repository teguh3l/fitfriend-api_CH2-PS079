const express = require('express');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
const serviceAccount = require('./serviceAccountKey.json');

const dotenv = require('dotenv');

//middleware
const checkUserAuth = require('./middlewares/checkAuth');

require('dotenv').config();
const app = express();
const port = process.env.PORT;

// get model data user in mongodb
const User = require('./model-db/user');

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//initializing firebase setup
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

// user logined
app.get('/user/:uid', checkUserAuth, async (req, res) => {
	const { uid } = req.params;
	const { email, displayName } = req.user;

	try {
		const existingUser = await User.findOne({ uid });

		if (!existingUser) {
			const newUser = new User({ uid, email, displayName });
			await newUser.save();
			res.status(200).send({ uid, email, displayName });
		} else {
			res.status(204).send({ uid, email, displayName });
		}
	} catch (error) {
		console.error('Error checking or adding user:', error);
		res.status(500).send('Internal Server Error');
	}
});

// Jalankan server
app.listen(port, () => {
	console.log(`Server berjalan di http://127.0.0.1:${port}`);
});
