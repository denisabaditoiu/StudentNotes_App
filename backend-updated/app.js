// Set global values
const { autoImportEnvVariables } = require('./utils/utilityService.js');
autoImportEnvVariables();

const { connectToDatabase } = require('./utils/database/createConnection.js');
connectToDatabase();

global.errorLogger = require('./utils/logger.js').errorLogger;
global.actionLogger = require('./utils/logger.js').actionLogger;

// Express instance
const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());

// Add ip to requests
const requestIp = require('request-ip');
app.use(requestIp.mw());

// Set request start time
const setTime = require('./api/middleware/requestStartMiddleware.js');
app.use(setTime);

// CORS Middleware
const cors = require('cors');
app.use(cors());

const compression = require('compression');
const shouldCompress = (req, res) => {
	if (req.headers['x-no-compression']) {
		return false;
	}
	return compression.filter(req, res);
};
app.use(compression({ filter: shouldCompress }));

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false, limit: '20000kb' }));
app.use(bodyParser.json({ extended: false, limit: '20000kb' }));

const morgan = require('morgan');

morgan.token('url', req => req.originalUrl.indexOf('login') === -1 ? req.originalUrl : '/login');
morgan.token('user', req => req.decoded ? req.decoded.email : 'no-user');
morgan.token('ip', req => req.clientIp || 'no-ip');

app.use(morgan(':method :status :date :user :ip :url :response-time ms'));

const config = { appRoot: __dirname };

SwaggerExpress.create(config, (err, swaggerExpress) => {
	if (err) {
		throw err;
	}
	swaggerExpress.register(app);
	app.listen(3001);
	console.log(`App listening to ${ 3001 }`);
});

