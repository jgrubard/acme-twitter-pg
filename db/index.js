const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

const SQL_SYNC = `
  DROP TABLE IF EXISTS tweets;
  CREATE TABLE tweets(
    id SERIAL PRIMARY KEY,
    name varchar(255)
  );
`;

const SQL_SEED = `
  INSERT INTO tweets(name) VALUES ('Mario');
  INSERT INTO tweets(name) VALUES ('Peach');
  INSERT INTO tweets(name) VALUES ('Bowser');
`;

const seed = (cb) => {
  client.query(SQL_SEED, cb);
};

const sync = (cb) => {
  client.query(SQL_SYNC, cb);
};

const getTweets = (cb) => {
  client.query('SELECT * FROM tweets', (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows);
  });
};

const getTweet = (id, cb) => {
  client.query('SELECT * FROM tweets WHERE id=$1', [id], (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows.length ? result.rows[0] : null);
  });
};

module.exports = {
  sync,
  seed,
  getTweets,
  getTweet
};
