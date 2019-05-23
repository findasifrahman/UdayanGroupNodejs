const Sequelize = require('sequelize');
const dbcontext = require('../dbcontext');

const products = dbcontext.define('products', {
    // attributes
    Id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    producttitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    productgroup:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    productmeta:{
        type: Sequelize.STRING
    },
    productseo:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    offer:{
        type: Sequelize.STRING
    },
    otherinfo:{
        type: Sequelize.STRING,
    },
    price:{
        type:Sequelize.NUMBER
    },
    image1:{
        type:Sequelize.STRING
    },
    image2:{
        type:Sequelize.STRING
    },
    image3:{
        type:Sequelize.STRING
    },
    image4:{
        type:Sequelize.STRING
    },
  }, {
    // options
  }
);

module.exports = products;