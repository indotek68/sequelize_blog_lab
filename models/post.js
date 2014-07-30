//post.js

function Post(sequelize, DataTypes){
  var Post = sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  },
  	{
  		classMethods: {
  			associate: function(db){
  				Post.belongsTo(db.author);
  			} 
  		}	
 	})
  return Post;
};

module.exports = Post;