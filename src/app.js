const express = require('express');

const { loginRouter, userRouter, categoryRouter, postRouter } = require('./routes');

const app = express();

app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

// ...

app.use((error, _req, res, _next) => res.status(error.status).json({ message: error.message }));

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
