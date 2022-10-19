var express = require('express');
var router = express.Router();
const { User } = require('../Model/User.js');
const { Counter } = require('../Model/Counter.js');
const multer = require('multer');

router.post('/register', (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: 'counter' })
    .exec()
    .then(doc => {
      temp.userNum = doc.userNum;
      console.log(temp);
      const userData = new User(temp);
      userData.save().then(() => {
        Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
router.post('/nameCheck', (req, res) => {
  User.findOne({ displayName: req.body.displayName })
    .exec()
    .then(doc => {
      let check = true;
      if (doc) {
        check = false;
      }
      res.status(200).json({ success: true, check });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
//프로필 업로드
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

router.post('/profile/upload', (req, res) => {
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
