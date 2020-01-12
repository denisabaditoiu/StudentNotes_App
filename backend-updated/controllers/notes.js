const validatorService = require('../../utils/validatorService.js');
const utilityService = require('../../utils/utilityService.js');
const authenticationFunctions = require('../functions/authentication.js');
const notesFunctions = require("../functions/notes.js");
var db = require('../models/index');

// Controller for POST /register
const addNote = (req, res) => {
	validatorService.validateInput.hasBody(req)
		.then(body => validatorService.validateSchema(body, validatorService.schemas.addNote))
		.then(body => notesFunctions.addNote(body))
		.then(data => {
			res.status(global.HTTP_SUCCESS).jsonp({
				status: 'success',
				message: 'The user has been created',
				data: data
			});
			utilityService.logAction(req, req.startTime, `${ data.user.email } __time__`, res);
		})
		.catch(err => utilityService.logResponse(res, err));
};

const getNote = (req, res) => {
    const noteId = req.swagger.params.noteId.value;
    return notesFunctions.getNote(noteId)
    .then(data => {
        res.status(global.HTTP_SUCCESS).jsonp({
				status: 'success',
				message: 'The note hase been fetched',
				data: data
			});
			utilityService.logAction(req, req.startTime, `${ data.user.email } __time__`, res);
    })
    .catch(err => utilityService.logResponse(res, err));
};
module.exports = {
	addNote
};
