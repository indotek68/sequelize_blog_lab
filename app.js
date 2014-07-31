var express = require("express"),
  db = require("./models/index.js"),
  app = express(),
  methodOverride = require('method-override'),
  bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));

//Homepage includes links to sign up and login
app.get("/", function(req, res){
  res.render('home');
});

//Sign Up page
app.get("/signup", function(req, res){
  res.render('signup', {message: null});
});

//Login page
app.get("/login", function(req, res){
  res.render('login', {message: null});
});

//Render all Post titles
app.get("/post", function(req, res){
  db.post.findAll().success(function(posts){
  console.log("find All" + posts);
    res.render('index', {posts: posts});
  });
});

// find All Authors
app.get("/post/new", function(req, res){
  db.author.findAll().success(function(authors){
    res.render('new', {authors: authors});
  });
});

//Renders individual posts page w/
//Title, Author & Content
app.get("/post/:id/", function(req, res){
  var postId = Number(req.params.id);
  //console.log("postId " + postId)

  db.post.find(postId).success(function(post){
    db.author.find(post.dataValues.authorId).success(function(author){
      res.render('show', {post: post, author: author});
    });
  });
});

app.get("/post/:id/edit", function(req, res){
  var postId = Number(req.params.id);
  //console.log("postId " + postId)
  res.render('edit');

  db.post.find(postId).success(function(post){
  });
});

app.post("/signup", function(req, res){
  var authorName = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);

  db.author.createNewUser(authorName, username, password,
    function(err){
      res.render("signup", {message: err.message, username: username});
    },
    function(success){
          res.redirect("/post");
  });
});

app.post("/login", function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);

  db.author.authorize(username, password,
    function(err){
      res.render("login", {message: err.message, username: username});
    },
    function(success){
          res.redirect("/post");
  });
});

app.post("/post", function(req, res){
  var createdPost = req.body.post;
  var newPost = db.post.build({title: createdPost.title, content: createdPost.content, authorId: createdPost.authorId});
  
  db.author.find(createdPost.authorId).success(function(author){
    //console.log(author)
     author.addPost(newPost).success(function(){
      newPost.save();
      res.redirect("/post");
    });
  });
});

app.delete("/post/:id", function(req, res){
  var postId = Number(req.params.id);

  db.post.destroy(postId).success(function(){
    res.redirect("/post");
  });
});

app.put("/post/:id", function(res, req){
  var postId = Number(req.params.id);
  var foundPost = req.body.post;
  var updatedPost = updateAttributes({title: foundPost.title, content: foundPost.content});

  db.post.find(postId).success(function(post){
    post.updatedPost.success(function(){
      res.redirect("/post");
    })
  })
res.redirect("/post");
});


app.listen(3000, function(){
  console.log("SERVER listening on 3000")
})