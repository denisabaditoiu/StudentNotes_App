/**
 * Maps all global variables
 */
const autoImportEnvVariables = () => {
	global.DB_USERNAME = 'root';
	global.DB_PASSWORD = '';
	global.DB_NAME = 'studentnotes';
	global.JWT_SECRET = '711E7A93417AC6214645A4DADDECBBCA7E847E1DBF9F74923BE41D4588BD331C';
	global.HTTP_SUCCESS = 200;
	global.HTTP_BAD_REQUEST = 400;
	global.HTTP_INTERNAL_SERVER_ERROR = 500;
	global.HTTP_UNAUTHORIZED = 401;
};

/**
 * Send standard errors
 * @param errObject default value 'An unexpected error has occurred'
 * @param message default value 'Unknown Error'
 * @param httpCode default 500
 * @param thrower default internal-module ( unspecified module )
 * @param extraField
 * @constructor
 */
const createError = function(
	errObject = new Error(),
	message = 'Unhandled error',
	httpCode = HTTP_INTERNAL_SERVER_ERROR,
	thrower = 'internal-module',
	extraField) {
	if (!( errObject instanceof Error )) {
		errObject = new Error(errObject);
	}
	if (Error.captureStackTrace) {
		Error.captureStackTrace(this, this.constructor);
	}
	this.stack = ( errObject ).stack;
	this.thrower = thrower;
	this.message = message;
	this.httpCode = httpCode;
	if (extraField) {
		this.extra = extraField;
	}
};

/**
 * Logs a request
 * @param req
 * @param start
 * @param str
 * @param res
 * @returns {*}
 */
const logAction = (req, start, str, res) => {
	const now = new Date();
	const time = now.getTime() - start;
	str = str.replace('__time__', time + 'ms');
	global.actionLogger.info({
		message: str || 'no-data',
		route: req.originalUrl,
		email: req.decoded && req.decoded.email || 'no-email',
		clientIp: req.clientIp,
		method: req.method,
		status: res.statusCode
	});
};

/**
 * Log error and respond
 * @param res response parameter from request
 * @param err error that has occurred
 */
const logResponse = (res, err) => {
	if (!( err instanceof Object ) || !err.httpCode) {
		err = new createError(err);
	}
	const mes = getMessage(err);
	global.errorLogger.error({
		message: err.message,
		stack: err.stack
	});
	if (res) {
		const httpCode = err.httpCode > 100 && err.httpCode < 999 ? parseInt(err.httpCode) : 'no-code';
		return res.status(( Number.isInteger(httpCode) ? httpCode : HTTP_INTERNAL_SERVER_ERROR )).jsonp({ error: mes.message });
	}
};

/**
 * Set error message
 * @param errObject
 */
const getMessage = errObject => {
	let message = {};
	message['data'] = errObject.stack;
	message['message'] = errObject.message;
	message['code'] = errObject.httpCode;
	message['thrower'] = errObject.thrower;
	if (errObject.extra) {
		message['extra'] = errObject.extra;
	}

	return message;
};

module.exports = {
	autoImportEnvVariables,
	createError,
	logAction,
	logResponse,
	getMessage
};
