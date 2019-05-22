const Sequelize = require('sequelize');
const dbcontext = require('../dbcontext');

const Comments = dbcontext.define('comments', {
    // attributes
    Id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postId: {
      type: Sequelize.STRING
    },
    comment: {
        type: Sequelize.STRING
    },
    created: {
        type: Sequelize.DATE
    },
    userId: {
        type: Sequelize.INTEGER
    },
  }, {
    // options
  }
);

module.exports = Comments;