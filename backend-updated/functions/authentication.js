const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utilityService = require('../../utils/utilityService.js');
const databaseService = require('../../utils/databaseService.js');

/**
 * Hash the password before insertion
 * @param password String
 * @returns {Promise}
 */
const hashPassword = password => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt((saltError, salt) => {
			if (saltError) {
				reject(new utilityService.createError(new Error(), saltError, global.HTTP_BAD_REQUEST, 'hashPassword'));
			}
			bcrypt.hash(password, salt, (hashError, hash) => {
				if (hashError) {
					reject(new utilityService.createError(new Error(), hashError, global.HTTP_BAD_REQUEST, 'hashPassword'));
				}
				resolve(hash);
			})
		});
	});
};

/**
 * Register a user
 * @param req Object
 * @param newUserData Object
 * @returns {Promise}
 */
const register = newUserData => {
	return new Promise((resolve, reject) => {
		let token = '', savedUser = {};

		return databaseService.getAllUsers()
			.then(users => {
				if (users.find(user =>user.email === newUserData.email)) {
					return reject(new utilityService.createError(new Error('An user with this e-mail address already exists'), 'An user with this e-mail address already exists', global.HTTP_BAD_REQUEST, 'register'));
				}

				return hashPassword(newUserData.password)
			})
			.then(hash => {
				const data = {
					email: newUserData.email,
					fullName: newUserData.fullName,
					password: hash
				};

				return databaseService.saveUser(data)
			})
			.then(user => {
				savedUser = user;
				const metadata = {
					id: user._id,
					email: user.email
				};

				const expire = {};
				token = jwt.sign(metadata, global.JWT_SECRET, expire);
			})
			.then(() => {
				resolve({
					token: token,
					user: {
						id: savedUser.id,
						email: savedUser.email
					}
				});
			})
			.catch(err => reject(err));
	});
};

module.exports = {
	register
};