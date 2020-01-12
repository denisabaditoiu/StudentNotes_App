module.exports = function(sequelize, DataTypes) {
    var Notes = sequelize.define("notes", {
        nameNote: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        textNote: DataTypes.STRING,
        urlPicture: DataTypes.STRING
    });
    return Notes
}