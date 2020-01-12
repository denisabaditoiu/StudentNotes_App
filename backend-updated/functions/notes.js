const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utilityService = require('../../utils/utilityService.js');
const databaseService = require('../../utils/databaseService.js');

const addNote = newNote => { 
	return new Promise((resolve, reject) => {
		let savedNote = {};

				const data = {
					noteType: newNote.noteType,
					textNote: newNote.textNote,
					name: newNote.name
				};

				return databaseService.saveNote(data)
			.then(note => {
				resolve(note);
			})
			.catch(err => reject(err));
	});
};

const getNote = noteId => {
	return new Promise((resolve, reject) => {
	    return databaseService.getNote(noteId)
	    .then(note => {
				resolve(note);
			})
			.catch(err => reject(err));
	})
}

module.exports = {
	addNote
};