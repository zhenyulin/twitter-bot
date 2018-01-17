import express from 'express';

import getTweets from './get-tweets';

const app = express();

const USERS = ['realDonaldTrump'];

app.route('/').get(async (req, res) => {
  try {
    const tweets = await getTweets(USERS[0]);
    return res.json(tweets);
  } catch (e) {
    console.log(e);
  }
});

export default app;
