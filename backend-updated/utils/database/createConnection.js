const sequelize = require('sequelize');
const mysql = require('mysql2/promise.js');

/**
 * Function to connect to the database
 */
const connectToDatabase = () => {
	mysql.createConnection({
		user: global.DB_USERNAME,
		password: global.DB_PASSWORD
	}).then(connection => {
		global.DB_CONNECTION = connection;
		return global.DB_CONNECTION.query(`CREATE DATABASE IF NOT EXISTS ${ global.DB_NAME }`)
	}).then(() => {
		return Promise.all([
			global.DB_CONNECTION.query(`USE ${ global.DB_NAME }`),
			global.DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS users'),
			global.DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS notes')
		]);
	}).then(() => {
		global.SEQUELIZE = new sequelize(global.DB_NAME, global.DB_USERNAME, global.DB_PASSWORD, {
			dialect: 'mysql',
			logging: false
		});
		console.log('Connected to MySQL');
		global.DB_CONNECTION.end();
	})
		.catch(err => console.error('Could not start up the MySQL connection', err.stack))
};

module.exports = {
	connectToDatabase
};
