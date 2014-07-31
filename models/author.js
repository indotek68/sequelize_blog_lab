// author.js

function Author(sequelize, DataTypes){
  var Author = sequelize.define('author', {
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true, 
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
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
