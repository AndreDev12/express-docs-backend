const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Hello world!'));
app.post('/', (req, res) => res.send('Got a POST request'));
app.put('/user', (req, res) => res.send('Got a PUT request at /user'));
app.delete('/user', (req, res) => res.json('Got a DELETE request at /user'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use((req, res, next) => res.status(404).send("Sorry can't find that!"));

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
