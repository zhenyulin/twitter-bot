import express from 'express';
import fs from 'fs';
import logger from 'winston';
import raven from 'raven';

import model from 'data/models/1516321934455-1684.json';

import getTweets from './apis/get-tweets';
import { modelTweets } from './core/modeller';
import { generateTweet } from './core/generator';

const app = express();

raven.config(process.env.SENTRY_DSN).install();

app.use(raven.requestHandler());

app.route('/model').get(async (req, res, next) => {
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
    return next(e);
  }
});

app.route('/').get(async (req, res, next) => {
  try {
    const tweet = generateTweet(model);
    return res.send(tweet);
  } catch (e) {
    logger.error(e);
    return next(e);
  }
});

app.use(raven.errorHandler());

/* eslint-disable */
app.use(function(err, req, res, next) {
  res.status(500).send(`${res.sentry}\n`);
});
/* eslint-enable */

export default app;
