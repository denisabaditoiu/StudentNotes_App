const validatorService = require('../../utils/validatorService.js');
const utilityService = require('../../utils/utilityService.js');
const authenticationFunctions = require('../functions/authentication.js');

// Controller for POST /register
const register = (req, res) => {
	validatorService.validateInput.hasBody(req)
		.then(body => validatorService.validateSchema(body, validatorService.schemas.register))
		.then(user => authenticationFunctions.register(user))
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

module.exports = {
	register
};
