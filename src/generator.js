import { parseTweet, parseWord, isEndPunc } from './parser';

const START = '__START';
const END = '__END';
const initialValues = {
  next: {},
  word: {},
  count: 0,
};

export const modelSentence = words => {
  const model = {};
  const wrap = [START, ...words, END];

  for (let i = 0; i < wrap.length - 1; i += 1) {
    const word = wrap[i];
    const nextWord = wrap[i + 1];
    const currentKey = word.toLowerCase();
    const nextKey = nextWord.toLowerCase();
    // TODO: update deep clone method
    const current =
      model[currentKey] || JSON.parse(JSON.stringify(initialValues));
    current.count += 1;

    current.next[nextKey] = (current.next[nextKey] || 0) + 1;
    // object key is case sensitive
    current.word[word] = (current.word[word] || 0) + 1;
    model[currentKey] = current;
  }

  return model;
};

export const buildLanguageModel = tweets => {
  const languageModel = tweets.reduce((lastModel, tweet) => {
    // TODO: update deep clone method
    const model = JSON.parse(JSON.stringify(lastModel));
    const words = parseTweet(tweet);
    const wrap = [START, ...words, END];
    for (let i = 0; i < wrap.length - 1; i += 1) {
      const word = wrap[i];
      const nextWord = wrap[i + 1];
      const currentKey = word.toLowerCase();
      const nextKey = nextWord.toLowerCase();
      const current = model[currentKey] || {
        next: {},
        word: {},
        count: 0,
      };
      current.count += 1;

      current.next[nextKey] = (current.next[nextKey] || 0) + 1;
      // object key is case sensitive
      current.word[word] = (current.word[word] || 0) + 1;
      model[currentKey] = current;
    }
    return model;
  }, {});

  return languageModel;
};
