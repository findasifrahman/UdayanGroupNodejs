const Sequelize = require('sequelize');
const dbcontext = require('../dbcontext');
const Comments = require('./comment');

const Posts = dbcontext.define('posts', {
    // attributes
    Id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    description: {
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


Posts.coms = Posts.hasMany(Comments, { onDelete: 'CASCADE' });//, {foreignKey: 'postId', sourceKey: 'Id'});
Comments.belongsTo(Posts, { onDelete: 'CASCADE' });//, {foreignKey: 'postId', targetKey: 'Id'});
 


module.exports = Posts;