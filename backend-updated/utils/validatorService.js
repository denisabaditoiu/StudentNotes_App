const Joi = require('@hapi/joi');
const utilityService = require('./utilityService.js');

const schemas = {
	checkObject: Joi.object().required().error(new Error('Invalid object')),
	register: Joi.object().keys({
		email: Joi.string().email().min(7).max(256).required().error(errors => {
			errors.forEach(err => {
				switch (err.type) {
					case "any.empty":
					case "any.required": {
						err.message = "E-mail address is required and must be a valid email address";
						break;
					}
					case "string.min": {
						err.message = "E-mail address must be at least 7 characters long";
						break;
					}
					case "string.max": {
						err.message = "E-mail address can have at most 256 characters";
						break;
					}
					case "string.email": {
						err.message = "E-mail address must be a valid e-mail";
						break;
					}
					default: {
						break;
					}
				}
			});
			return new Error(errors);
		}),
		password: Joi.string().min(7).max(128).required().error(errors => {
			errors.forEach(err => {
				switch (err.type) {
					case "any.empty":
					case "any.required": {
						err.message = "Password is required";
						break;
					}
					case "string.min": {
						err.message = "Password must be at least 7 characters long";
						break;
					}
					case "string.max": {
						err.message = "Password can have at most 128 characters";
						break;
					}
					default: {
						break;
					}
				}
			});
			return new Error(errors);
		}),
		fullName: Joi.string().min(7).max(128).required().error(errors => {
			errors.forEach(err => {
				switch (err.type) {
					case "any.empty":
					case "any.required": {
						err.message = "Your full name is required";
						break;
					}
					case "string.min": {
						err.message = "Your full name must be at least 7 characters long";
						break;
					}
					case "string.max": {
						err.message = "Your full name can have at most 128 characters";
						break;
					}
					default: {
						break;
					}
				}
			});
			return new Error(errors);
		})
	}),
	addNote: Joi.object().keys({
		textNote: Joi.string().required().error(new Error("textNote is undefined")),
		nameNote: Joi.string().required().error(new Error("nameNote is undefined")),
		user: Joi.object().required().error(new Error("user is undefined"))
	}),
};

//fullName: Joi.string().min(7).max(128).required().error(new Error(""))

/**
 * Validate if the request has a body
 * @param req
 * @returns {Promise}
 */
const validateInput = {
	hasBody: req => {
		return new Promise((resolve, reject) => {
			if (!req.body) {
				reject(new utilityService.createError(new Error(), 'The request has no body', global.HTTP_INTERNAL_SERVER_ERROR, 'jam-validator-service'));
			}
			return resolve(req.body);
		});
	}
};

/**
 * Validates an object and returns another object based on the selected options sent as parameters
 * @param parameter to evaluate
 * @param schema Object Joi schema
 * @param options Object the type of return the function will have
 * @param customErrorMessage String with a special error message
 * @returns {Promise}
 */
const validateSchema = (parameter, schema, options = {
	allowUnknown: true,
	stripUnknown: true
}, customErrorMessage) => {
	return new Promise((resolve, reject) => {
		if (schema === undefined || schema === null || typeof schema !== 'object') {
			return reject(new utilityService.createError(new Error(), 'The schema passed to validation is invalid', global.HTTP_INTERNAL_SERVER_ERROR, 'jam-validator-service'));
		}
		if (options === undefined || typeof options !== 'object') {
			return reject(new utilityService.createError(new Error(), 'The options passed to validation are invalid', global.HTTP_INTERNAL_SERVER_ERROR, 'jam-validator-service'));
		}

		schema.validateAsync(parameter, options)
			.then(value => resolve(value))
			.catch(err => {
				err.message = customErrorMessage || err.message;
				return reject(new utilityService.createError(new Error(customErrorMessage || err.message), customErrorMessage || err.message, global.HTTP_BAD_REQUEST, 'jam-validator-service'));
			})
	});
};

/**
 * Validate if the parameter is an object
 * @param object Object to evaluate
 * @param customErrorMessage String with a special error message
 * @returns {Promise}
 */
const validateObject = (object, customErrorMessage) => {
	return validateSchema(object, schemas.checkObject, undefined, customErrorMessage);
};

/**
 * Validate if the parameter is an array
 * @param array String or Number to evaluate
 * @param customErrorMessage String with a special error message
 * @returns {Promise}
 */
const validateArray = (array, customErrorMessage) => {
	const errorText = customErrorMessage || 'The parameter is not an array';
	return new Promise((resolve, reject) => {
		if (array === undefined || array === null || !Array.isArray(array)) {
			return reject(new utilityService.createError(new Error(), errorText, global.HTTP_INTERNAL_SERVER_ERROR, 'jam-validator-service'));
		}
		resolve(array);
	});
};


module.exports = {
	schemas,
	validateInput,
	validateSchema,
	validateObject,
	validateArray
};

