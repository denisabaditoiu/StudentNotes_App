const sequelize = require('sequelize');

const UserModel = global.SEQUELIZE.define('user', {
	userMail: sequelize.STRING,
	userPassword: sequelize.STRING
}, {
	timestamps: false,
	tableName: 'users'
});

module.exports = UserModel;
