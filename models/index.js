var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , env       = process.env.NODE_ENV || 'development'
  , config    = require(__dirname + '/../config/config.json')[env]
  , sequelize = new Sequelize(config.database, config.username, config.password, config)
  , db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// Associations

// db.author.hasMany(db.post);
// db.post.belongsTo(db.author);

// console.log(db.post)

// db.author.find(1).success(function(foundAuthor){
//   var newPost = db.post.build({title: "hello worlds again!", content: "Jammin", authorId: foundAuthor.id});
//   foundAuthor.addPost(newPost).success(function(){
//     newPost.save()
//   })
// });


// db.post.create({content: "Hello Worlds"})
//   .success(function(postObj){
//     console.log("postObj", postObj)
// });

// db.author.create({name: "Bob Marley"})
//   .success(function(authorObj){
//     console.log("authorObj", authorObj)
// });

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)









