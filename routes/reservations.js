var express = require('express');
var router = express.Router();
var axios = require('axios');

// /api

var slack = {};

if (process.env.NODE_ENV !== 'production') {
      slack = require('../secrets.json').slack;
} else {
      slack = {
            one: process.env.TEAM_ID,
            two: process.env.SLACK_TWO,
            three: process.env.SLACK_THREE,
      }
}

router.post('/slack-confirmation', function (req, res, next) {
      console.log('request to confirm was made \n\n', req.body);
      res.send(req.body.challenge);
});

router.post('/slack-hello', function (req, res, next) {
      (async () => {
            try {
                  await axios.post(`https://hooks.slack.com/services/${slack.TEAM_ID}/${slack.two}/${slack.three}`, {
                        "text": "hello message"
                  });

            } catch (e) {
                  console.error(e);
            }
      })();

      res.render('index', { title: 'Check the channel' });
});

router.post('/slack-reservation', function (req, res, next) {
      let text = req.body.text.split(' ');
      let obj = {};

      for (let i = 0; i < text.length; i++) {
            if (text[i] === 'for') {
                  obj.guests = text[i + 1];
            }
            if (text[i] === 'at') {
                  obj.time = text[i + 1];
            }
      }

      (async () => {
            try {
                  await axios.post(`https://hooks.slack.com/services/${slack.TEAM_ID}/${slack.two}/${slack.three}`, {
                        "text": `yas queen, got your table for ${obj.guests} at ${obj.time}`
                  });
            } catch (e) {
                  console.error(e);
            }
      })();
      console.log('request to slack reservation\n\n', req.body);
});

module.exports = router;
