var express = require('express');
var router = express.Router();
var axios = require('axios');

// /api

var slack = {};

if (process.env.NODE_ENV !== 'production') {
      slack = require('../secrets.json').slack;
}
slack = {
      TEAM_ID: process.env.TEAM_ID || slack.TEAM_ID,
      two: process.env.SLACK_TWO || slack.two,
      three: process.env.SLACK_THREE || slack.three,
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
            if (text[i].toLowerCase() === 'for') {
                  obj.guests = text[i + 1];
            }
            if (text[i].toLowerCase() === 'at') {
                  obj.time = text[i + 1];
            }
      }
      let replyText = '';

      if (!obj.hasOwnProperty('guests')) {
            replyText = `Please try again for number of guests, use the keyword 'for' `;
      } else if (!obj.hasOwnProperty('time')) {
            replyText = `Please try again for a time, use the keyword 'at'`;
      } else {
            replyText = `Got your table for ${obj.guests} at ${obj.time}`;
      }

      (async () => {
            try {
                  await axios.post(`https://hooks.slack.com/services/${slack.TEAM_ID}/${slack.two}/${slack.three}`, {
                        "text": replyText
                  });
            } catch (e) {
                  console.error(e);
            }
      })();

      console.log('request to slack reservation\n\n', req.body);
      res.send(req.body.challenge);
});

module.exports = router;
