const Sequelize = require('sequelize');
const dbcontext = require('../dbcontext');

const productgroup = dbcontext.define('productgroup', {
    // attributes
    Id: {
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

module.exports = productgroup;