// author.js

function Author(sequelize, DataTypes){
  var Author = sequelize.define('author', {
    name: DataTypes.STRING
  },
  	{
  		classMethods: {
  			associate: function(db) {
  				Author.hasMany(db.post);
  			}
  		}
  	})
  return Author;
};


module.exports = Author;
