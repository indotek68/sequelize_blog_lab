var express = require("express"),
  db = require("./models/index.js"),
  app = express(),
  methodOverride = require('method-override'),
  bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));

//Render all Post titles
app.get("/post", function(req, res){
  db.post.findAll().success(function(posts){
  console.log("find All" + posts);
    res.render('index', {posts: posts})
  })
})

//Renders individual posts page w/
//Title, Author & Content
app.get("/post/:id", function(req, res){
  var postId = Number(req.params.id);
  //console.log("postId " + postId)

  db.post.find(postId).success(function(post){
    db.author.find(post.dataValues.authorId).success(function(author){
      res.render('show', {post: post, author: author});
    })
  })
});

//find All Authors
app.get("/post/new", function(req, res){
  db.author.findAll().success(function(authors){
    res.render('new', {authors: authors});
  })
})

app.post("/post", function(req, res){
  var createdPost = req.body.post;
  var newPost = db.post.build({title: createdPost.title, content: createdPost.content, authorId: createdPost.authorId});
  
  db.author.find(createdPost.authorId).success(function(author){
    //console.log(author)
     author.addPost(newPost).success(function(){
      newPost.save();
      res.redirect("/post");
    })
  })
});

app.delete("/post/:id", function(req, res){
  var postId = Number(req.params.id);

  db.post.destroy(postId).success(function(){
    res.redirect("/post");
  });
});

app.put("/post/:id/edit"), function(res, req){
  var postId = Number(req.params.id);
  var foundPost = req.body.post;
  var updatedPost = updateAttributes({title: foundPost.title, content: foundPost.content});

  db.post.find(postId).success(function(post){
    post.updatedPost.
  })
    
}


app.listen(3000, function(){
  console.log("SERVER listening on 3000")
})