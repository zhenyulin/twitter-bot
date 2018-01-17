import Twit from 'twit';

const twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const getTweet = async ({ user, lastId }) => {
  const query = {
    screen_name: user,
    count: 200,
    include_rts: false,
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
    while (depth < 10) {
      const data = await getTweet({ user, lastId });
      const text = data.filter(t => t.lang === 'en').map(t => t.text);
      tweets = [...tweets, ...text];
      lastId = data.pop().id_str;
      depth++;
    }
    return tweets;
  } catch (e) {
    throw e;
  }
};
