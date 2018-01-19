import { parseTweet } from './parser';
import { START, END } from './constants';

const initialValues = () => ({
  next: {},
  forms: {},
  count: 0,
});

// COMPARISON: use case sensitive word as key
export const updateModel = (lastModel, words) => {
  // TODO: update deep clone method
  const model = JSON.parse(JSON.stringify(lastModel));
  const wrap = [START, ...words, END];

  for (let i = 0; i < wrap.length - 1; i += 1) {
    const word = wrap[i];
    const nextWord = wrap[i + 1];
    const currentKey = word.toLowerCase();
    const nextKey = nextWord.toLowerCase();
    const current = model[currentKey] || initialValues();
    current.count += 1;

    current.next[nextKey] = (current.next[nextKey] || 0) + 1;
    // object key is case sensitive
    current.forms[word] = (current.forms[word] || 0) + 1;
    model[currentKey] = current;
  }

  return model;
};

export const buildLanguageModel = tweets => {
  const languageModel = tweets.reduce((lastModel, tweet) => {
    const words = parseTweet(tweet);
    const model = updateModel(lastModel, words);
    return model;
  }, {});

  return languageModel;
};

export const buildFrequencyMap = languageModel => {
  const modelFrequency = (tree, sum) => {
    const update = {};
    Object.keys(tree).reduce((base, leaf) => {
      const count = tree[leaf];
      const position = base + count;
      update[leaf] = {
        word: leaf,
        count,
        weight: count / sum,
        percentage: position / sum,
      };
      return position;
    }, 0);
    return update;
  };

  Object.keys(languageModel).forEach(key => {
    const node = languageModel[key];
    node.next = modelFrequency(node.next, node.count);
    node.forms = modelFrequency(node.forms, node.count);
  });
  return languageModel;
};

export const modelTweets = tweets =>
  buildFrequencyMap(buildLanguageModel(tweets));
