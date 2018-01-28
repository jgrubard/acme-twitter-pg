const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
  res.locals.path = req.url;
  next();
});

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Twitter' });
});

app.use('/tweets', require('./routes/tweets'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

db.sync((err) => {
  if (err) return console.log(err);
  db.getTweets((err, tweets) => {
    if (err) return console.log(err);
    db.seed((err) => {
      if (err) return console.log(err);
      db.getTweets((err, tweets) => {
        if (err) return console.log(err);
        db.getTweet(3, (err, tweet) => {
          if(err) return console.log(err);
        });
      });
    });
  });
});
