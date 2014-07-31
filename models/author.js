// author.js
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

function Author(sequelize, DataTypes){
  var Author = sequelize.define('author',{
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        len: [6, 30],
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    classMethods: {
  			associate: function(db) {
  				Author.hasMany(db.post);
  			},
        encryptPass: function(password) {
          var hash = bcrypt.hashSync(password, salt);
          return hash;
        },
        comparePass: function(userpass, dbpass){
          return bcrypt.compareSync(userpass, dbpass);
        },
        createNewUser: function(name, username, password, err, success){
          if(password.length < 6){
            err({message: "Password should be more than 6 characters"});
          }
          else{
            Author.create({
              name: name,
              username: username,
              password: Author.encryptPass(password)
            }).error(function(error){
              console.log(error);
              if(error.username){
                err({message: "Your username should be at least 6 characters", username: username});
              }
              else{
                err({message: "An account with that username already exists", username: username});
              }
            }).success(function(author) {
              success({message: "Account created, please log me in"});
            });
          }
        },
        authorize: function(username, password, err, success){
          Author.find({
            where: {
              username: username
            }
          })
          .done(function(error, author){
            if(error){
              console.log(error);
              err({message: "Oops something went worng"});
            }
            else if (author === null){
              err({message: "Username does not exist"});
            }
            else if(Author.comparePass(password, author.password) === true){
              success();
            }
            else {
              err({message: "Invalid Password"});
            }
          });
        }
      }  
  });
  return Author;
}
module.exports = Author;
