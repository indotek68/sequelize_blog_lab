//post.js

function Post(sequelize, DataTypes){
  return sequelize.define('post', {
    content: DataTypes.STRING
  });
};


module.exports = Post;