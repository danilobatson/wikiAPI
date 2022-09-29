const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  //Account has been deleted from MongoDB Atlas
  'mongodb+srv://dbatson09:ColtsnMGDB0108!@cluster0.urnq8y4.mongodb.net/wikiDB',
  {
    useNewUrlParser: true,
  }
);

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model('Article', articleSchema);

app
  //Requests targeting all articles
  .route('/articles')
  //GET all articles
  .get((req, res) => {
    Article.find({}, (err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  //POST a new article
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save((err) => {
      if (!err) {
        res.send('Successfully added a new article.');
      } else {
        res.send(err);
      }
    });
  })
  //DELETE all articles
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send('Successfully deleted all articles.');
      } else {
        res.send(err);
      }
    });
  });

app
  //Requests targeting a specific article
  .route('/articles/:articleTitle')
  //GET a specific article
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
      foundArticle
        ? res.send(foundArticle)
        : res.send('No articles matching that title were found.');
    });
  })
  //Delete a specific article
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (err) => {
      !err ? res.send('Successfully deleted the article.') : res.send(err);
    });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
