var express = require('express');
var router = express.Router();
var axios = require('axios');

const { slack } = require('../secrets.json');

/* GET home page. */
router.get('/', function (req, res, next) {
  (async () => {
    try {
      const res = await axios.post(`https://hooks.slack.com/services/${slack.one}/${slack.two}/${slack.three}`, {
        "text": "second message"
      });

    } catch (e) {
      console.error(e);
    }


  })();

  res.render('index', { title: 'Express' });
});

module.exports = router;
