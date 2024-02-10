const express = require('express');

const mw = require('./myMiddleware');
const { userById } = require('./userById');
const birds = require('./birds');

const app = express();
const port = 8080;

// Controladores de ruta
const cb0 = function (req, res, next) {
  console.log('CB0');
  next();
};

const cb1 = function (req, res, next) {
  console.log('CB1');
  next();
};

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use('/birds', birds);
app.use('/users', userById);
app.use('/', myLogger, requestTime, mw({ option1: '1', option2: '2' }));

// Verbos
app.get('/', (req, res) => {
  let responseText = 'Hello world!<br>';
  responseText += `<small>Request at: ${req.requestTime}</small>`;
  res.send(responseText);
});
app.post('/', (req, res) => res.send('Got a POST request'));
app.put('/user', (req, res) => res.send('Got a PUT request at /user'));
app.delete('/user', (req, res) => res.json('Got a DELETE request at /user'));

app.get('/users/:userId/books/:bookId', (req, res) => res.send(req.params));
app.get(
  '/example/d',
  [cb0, cb1],
  (req, res, next) => {
    console.log('the response will be sent by the next function ...');
    next();
  },
  (req, res) => res.send('Hello from D!')
);

// app.route()
app
  .route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });

// Manejo de error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Ruta no encontrada
app.use((req, res, next) => res.status(404).send("Sorry can't find that!"));

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
