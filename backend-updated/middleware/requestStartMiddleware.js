/**
 * Start request time
 * @param req
 * @param res
 * @param next
 */
const setTime = (req, res, next) => {
	const now = new Date();
	req.startTime = now.getTime();
	return next();
};

module.exports = setTime;
