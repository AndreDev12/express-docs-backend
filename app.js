const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Hello world!'));
app.post('/', (req, res) => res.send('Got a POST request'));
app.put('/user', (req, res) => res.send('Got a PUT request at /user'));
app.delete('/user', (req, res) => res.json('Got a DELETE request at /user'));

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
