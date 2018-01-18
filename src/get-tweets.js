import Twit from 'twit';

const twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const { TWITTER_SCRAPE_DEPTH } = process.env;

const getTweet = async ({ user, lastId }) => {
  const query = {
    include_rts: false,
    tweet_mode: 'extended',
    include_entities: false,
    screen_name: user,
    count: 2,
    max_id: lastId,
  };
  try {
    const { data } = await twitter.get('statuses/user_timeline', query);
    return data;
  } catch (e) {
    throw e;
  }
};

export default async user => {
  let tweets = [];
  let lastId;
  let depth = 0;
  try {
    while (depth < TWITTER_SCRAPE_DEPTH) {
      /* eslint-disable no-await-in-loop */
      const data = await getTweet({ user, lastId });
      const [first, ...rest] = data
        .filter(t => t.lang === 'en')
        .map(t => t.full_text);
      tweets = depth === 0 ? [...tweets, first, ...rest] : [...tweets, ...rest];
      lastId = data.pop().id;
      depth += 1;
    }
    return tweets;
  } catch (e) {
    throw e;
  }
};
