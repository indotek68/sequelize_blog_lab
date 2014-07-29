<!DOCTYPE>
<html>
  <head>
  </head>
  <body>
    <% posts.forEach(function(post) {%>
      <%= post.dataValues.name %>
    <% }) %>
  </body>
</html>