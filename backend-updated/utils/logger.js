const { format, createLogger, transports } = require('winston');
const { printf } = format;
const moment = require('moment');

moment.locale('en-gb');

const errorsFormat = printf(({ message, stack }) => {
	return `${ moment().format('llll') } ${ JSON.stringify(message) } ${JSON.stringify(stack)}`;
});

const actionsFormat = printf(({ message, route, email, clientIp, status, method }) => {
	return `${status} ${method} ${ moment().format('llll') } ${ clientIp } ${ route ? route.indexOf('login') === -1 ? route : '/login' : '' } ${ email ? email : '' } ${ message } `;
});

const consoleErrorFormat = printf(({ message, stack }) => {
	return `${ moment().format('llll') } ${ JSON.stringify(message) } ${stack}`;
});

// 50MB maximum size for a log file
const fileErrors = new transports.File({
	level: 'error',
	filename: './logs/errors.txt',
	maxsize: 5000 * 1024,
	maxFiles: 2,
	format: errorsFormat
});

const fileActions = new transports.File({
	level: 'info',
	filename: './logs/actions.txt',
	maxsize: 5000 * 1024,
	maxFiles: 2,
	format: actionsFormat
});

const console = new transports.Console({
	level: 'error',
	format: consoleErrorFormat
});

const errorLogger = createLogger({
	transports: [
		fileErrors,
		console
	],
	exitOnError: false
});

const actionLogger = createLogger({
	transports: [
		fileActions
	],
	exitOnError: false
});

module.exports = {
	errorLogger: errorLogger,
	actionLogger: actionLogger
};
