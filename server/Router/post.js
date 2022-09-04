var express = require('express');
var router = express.Router();
const { Post } = require('../Model/Post.js');
const { Counter } = require('../Model/Counter.js');
const multer = require('multer');

router.post('/submit', (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: 'counter' })
    .exec()
    .then(counter => {
      temp.postNum = counter.postNum;
      console.log(temp);
      const CommunityPost = new Post(temp);
      CommunityPost.save().then(() => {
        Counter.updateOne({ name: 'counter' }, { $inc: { postNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post('/list', (req, res) => {
  Post.find()
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch(err => res.stautus(400).json({ success: false }));
});

router.post('/detail', (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json({ success: true, postDetail: doc });
    })
    .catch(err => res.stautus(400).json({ success: false }));
});

router.post('/edit', (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(err => res.stautus(400).json({ success: false }));
});

router.post('/delete', (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json({ success: true, postDetail: doc });
    })
    .catch(err => res.stautus(400).json({ success: false }));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './image');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

router.post('/image/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      // console.log(res.req.file);
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});

module.exports = router;
