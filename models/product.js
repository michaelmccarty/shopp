module.exports = function (sequelize, DataTypes) {
  let Product = sequelize.define("Product", {
    // Giving the User model a name of type STRING
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    department_name: DataTypes.STRING,
    stock_quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  });


  return Product;
};


//INSERT INTO `products` (`name`,`stock_quantity`,`price`, `createdAt`, `updatedAt`) VALUES ('banana','6','1.99', '2019-08-29 05:14:42', '2019-08-29 05:14:42'); 