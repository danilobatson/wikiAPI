const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb+srv://dbatson09:ColtsnMGDB0108!@cluster0.urnq8y4.mongodb.net/todoListDB',
  {
    useNewUrlParser: true,
  }
);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
