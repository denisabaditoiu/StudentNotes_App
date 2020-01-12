module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("users", {
        sureName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        
        userMail:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        
        
        userPassword:{
            type:DataTypes.STRING,
             allowNull: false,
        
        }
        
        
        
        
    
    });
    return Users
}