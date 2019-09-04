module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      googleId: DataTypes.STRING
    });

    
    return User;
  };
  