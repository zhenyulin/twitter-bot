import express from 'express';
import fs from 'fs';

import model from 'data/models/1516321934455-1684.json';

import getTweets from './get-tweets';
import { modelTweets } from './modeller';
import { generateTweet } from './generator';

const app = express();

const USERS = ['realDonaldTrump'];

app.route('/create-model').get(async (req, res) => {
  try {
    console.log('start');
    console.time('get tweets');
    const tweets = await getTweets(USERS[0]);
    console.timeEnd('get tweets');
    console.log(`got ${tweets.length} tweets`);
    console.time('build frequency map');
    const frequencyMap = modelTweets(tweets);
    console.timeEnd('build frequency map');
    const stringified = JSON.stringify(frequencyMap);
    const filepath = `data/models/${Date.now()}-${tweets.length}.json`;
    await fs.writeFile(filepath, stringified, 'utf8', err => {
      if (err) {
        throw err;
      }
      console.log('frequency map saved');
    });
    return res.send('done');
  } catch (e) {
    console.log(e);
    return e;
  }
});

app.route('/').get(async (req, res) => {
  try {
    const tweet = generateTweet(model);
    return res.send(tweet);
  } catch (e) {
    console.log(e);
    return e;
  }
});

export default app;
