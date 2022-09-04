const express = require('express');
//express 라이브러리 다운
const path = require('path');
//mongoose 라이브러리 다운
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const config = require('./config/key.js');
//mongodb+srv://juliasong:song37@youtubeclone.gw6e57b.mongodb.net/?retryWrites=true&w=majority
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/image', express.static('./image'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/post', require('./Router/post.js'));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log('Connecting MogoDB...');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/*
1. post MongoDB Model위한 DB가 필요하다
2. client css (bootstrap, emotion)
*/
