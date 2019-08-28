module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
      // Giving the User model a name of type STRING
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      googleId: DataTypes.STRING
    });

    
    return User;
  };
  