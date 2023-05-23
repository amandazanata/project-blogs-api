const express = require('express');

const login = require('./controllers/user.controller');
const category = require('./controllers/category.controller');
const blogPost = require('./controllers/blogPost.controller');
const user = require('./controllers/user.controller');
const { validateLogin } = require('./middlewares/login.validation');
const { validateCategory } = require('./middlewares/category.validation');
const { validateToken } = require('./middlewares/token.validation');
const { validatePost, validateUpdate } = require('./middlewares/post.validation');
const { validateUser } = require('./middlewares/user.validation');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateLogin, login.getLogin);

app.get('/categories', validateToken, category.getAllCategories);
app.post('/categories', validateToken, validateCategory, category.createCategory);

app.get('/post/search', validateToken, blogPost.getPostByQuery);
app.get('/post', validateToken, blogPost.getAllPosts);
app.get('/post/:id', validateToken, blogPost.getPostById);
app.post('/post', validateToken, validatePost, blogPost.createPost);
app.put('/post/:id', validateToken, validateUpdate, blogPost.updatePost);
app.delete('/post/:id', validateToken, blogPost.deletePost);

app.get('/user', validateToken, user.getAllUsers);
app.get('/user/:id', validateToken, user.getUserById);
app.post('/user', validateUser, user.createUser);
app.delete('/user/me', validateToken, user.deleteUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
