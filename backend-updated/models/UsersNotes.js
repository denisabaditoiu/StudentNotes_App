module.exports = function(sequelize, DataTypes) {
    var UsersNotes = sequelize.define("users_notes", {
        userId: DataTypes.INTEGER,
        noteId: DataTypes.INTEGER
    });
    return UsersNotes
}