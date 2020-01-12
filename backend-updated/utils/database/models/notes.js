const sequelize = require('sequelize');

const NoteModel = global.SEQUELIZE.define('note', {
	textNote: sequelize.STRING,
	nameNote: sequelize.STRING,
	createdAt: sequelize.DATE,
	updatedAt: sequelize.DATE
}, {
	timestamps: false,
	tableName: 'notes'
});

module.exports = NoteModel;
