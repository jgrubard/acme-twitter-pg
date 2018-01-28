const express = require('express');
const app = express();
const db = require('./db');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.get('/tweets', (req, res, next) => {
  db.getTweets((err, tweets) => {
    if (err) return next(err);
    res.send(tweets);
  });
});

app.get('/tweets/:id', (req, res, next) => {
  db.getTweet(req.params.id, (err, tweet) => {
    if (err) return next(err);
    res.send(tweet);
  });
});

// app.get('/', (req, res, next) => {
//   res.render('index', { title: 'Home' });
// });

// app.get('/tweets', (req, res, next) => {
//   res.render('tweets', { title: 'Tweets' });
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});


db.sync((err) => {
  if (err) return console.log(err);
  console.log('tables have been created!');
  db.getTweets((err, tweets) => {
    if (err) return console.log(err);
    console.log(`there are ${tweets.length} users`);
    db.seed((err) => {
      if (err) return console.log(err);
      console.log('seeded');
      db.getTweets((err, tweets) => {
        if (err) return console.log(err);
        console.log(`there are ${tweets.length} users`);
        db.getTweet(3, (err, tweet) => {
          if(err) return console.log(err);
          console.log(`tweet with and id of 3 is ${tweet.tweet}`);
        });
      });
    });
  });


});
