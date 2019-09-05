module.exports = function (sequelize, DataTypes) {
  let Product = sequelize.define("Product", {
    // Giving the User model a name of type STRING
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    stock_quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  });


  return Product;
};