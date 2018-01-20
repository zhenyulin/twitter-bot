import express from 'express';
import fs from 'fs';
import logger from 'winston';

import model from 'data/models/1516321934455-1684.json';

import getTweets from './get-tweets';
import { modelTweets } from './modeller';
import { generateTweet } from './generator';

const app = express();

app.route('/model').get(async (req, res) => {
  const USERS = ['realDonaldTrump'];
  try {
    logger.info('start modelling process');
    logger.profile('get tweets');
    const tweets = await getTweets(USERS[0]);
    logger.profile('get tweets');
    logger.info(`got ${tweets.length} tweets`);
    logger.profile('build language model');
    const frequencyMap = modelTweets(tweets);
    logger.profile('build language model');
    const stringified = JSON.stringify(frequencyMap);
    const filepath = `data/models/${Date.now()}-${tweets.length}.json`;
    await fs.writeFile(filepath, stringified, 'utf8', err => {
      if (err) {
        throw err;
      }
    });
    logger.info('frequency map saved', filepath);
    return res.send('done');
  } catch (e) {
    logger.error(e);
    return e;
  }
});

app.route('/').get(async (req, res) => {
  try {
    const tweet = generateTweet(model);
    return res.send(tweet);
  } catch (e) {
    logger.error(e);
    return e;
  }
});

export default app;
