const Sequelize = require('sequelize');
const dbcontext = require('../dbcontext');
const products = require('./productmodels');
const productgroup = dbcontext.define('productgroup', {
    // attributes
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    groupname: {
      type: Sequelize.STRING
    },
    
  }, {
    // options
  }
);
productgroup.products = productgroup.hasMany(products, { onDelete: 'CASCADE' });//, {foreignKey: 'postId', sourceKey: 'Id'});
products.belongsTo(productgroup, { onDelete: 'CASCADE' });//, {foreignKey: 'postId', targetKey: 'Id'});

module.exports = productgroup;