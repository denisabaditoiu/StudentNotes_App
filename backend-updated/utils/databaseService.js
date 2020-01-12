const validatorService = require('./validatorService.js');
const utilityService = require('./utilityService.js');
const UsersModel = require('./database/models/user.js');
const NoteModel = require('./database/models/notes.js');

/**
 * Function to save a user in the database
 * @param data
 * @returns {Promise}
 */
const saveUser = data => {
	return new Promise((resolve, reject) => {
		validatorService.validateObject(data, 'data is required').catch(err => reject(err));

		let newUser = new UsersModel(data);

		return newUser.save()
			.then(savedUser => validatorService.validateObject(savedUser.dataValues, 'The user does not exist').then(user => resolve(user)).catch(err => reject(err)))
			.catch(err => reject(new utilityService.createError(new Error(), err, global.HTTP_BAD_REQUEST, 'database-service')))
	});
};

/**
 * Fetches all users from the database
 * @returns {Promise}
 */
const getAllUsers = () => {
	return new Promise((resolve, reject) => {
		return UsersModel.findAll()
			.then(users => validatorService.validateArray(users, 'Could not get all users').then(users => resolve(users)).catch(err => reject(err)))
			.catch(err => reject(new utilityService.createError(new Error(), err, global.HTTP_BAD_REQUEST, 'database-service')))
	})
};

const saveNote = data => {
	return new Promise((resolve, reject) => {
		validatorService.validateObject(data, 'data is required').catch(err => reject(err));

		let newNote = new NoteModel(data);

		return newNote.save()
			.then(savedNote => validatorService.validateObject(savedNote.dataValues, 'The note was not saved').then(note => resolve(note)).catch(err => reject(err)))
			.catch(err => reject(new utilityService.createError(new Error(), err, global.HTTP_BAD_REQUEST, 'database-service')))
	});
};

const getNote = data => {
	return new Promise((resolve, reject) => {
		return NoteModel.findOne({where: {id:data}})
		.then(savedUser => validatorService.validateObject(savedUser.dataValues, 'The note does not exist').then(user => resolve(user)).catch(err => reject(err)))
			.catch(err => reject(new utilityService.createError(new Error(), err, global.HTTP_BAD_REQUEST, 'database-service')))
	})
}

module.exports = {
	saveUser,
	getAllUsers,
	saveNote,
	getNote
};