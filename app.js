var express = require("express"),
  db = require("./models/index.js"),
  app = express();

app.set("view engine", "ejs");

app.get("/post", function(req, res){

  db.post.findAll().success(function(posts){
  	console.log("find All" + posts)
    res.render('index', {posts: posts})
  })
})

app.get("/post/new", function(req, res){
	res.render('new')
})

app.listen(3000, function(){
  console.log("SERVER listening on 3000")
})