const Sequelize = require('sequelize');
const dbcontext = require('../dbcontext');

const oauthlogin = dbcontext.define('oauthlogin', {
    // attributes
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    googleid: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    givenname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    }
  }, {
    // options
  }
);

module.exports = oauthlogin;