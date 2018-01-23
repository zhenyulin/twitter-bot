import { START, END } from './constants';

export const generateNextWord = (word, frequencyMap) => {
  const node = frequencyMap[word];
  const { next } = node;
  const r = Math.random();
  const nextWords = Object.keys(next);
  let generated = END;
  for (let i = 0; i < nextWords.length; i += 1) {
    const nextWord = nextWords[i];
    const nextWordInfo = next[nextWord];
    if (nextWordInfo.percentage >= r) {
      generated = nextWord;
      break;
    }
  }
  return generated;
};

export const generateWords = (minWords, frequencyMap) => {
  const MAX_LENGTH = 140;
  let word = START;
  let textLength = 0;
  const tweet = [];
  while (textLength - 1 <= MAX_LENGTH) {
    word = generateNextWord(word, frequencyMap);
    if (word === END) {
      break;
    }
    if (textLength + word.length > MAX_LENGTH) {
      break;
    }
    tweet.push(word);
    textLength += word.length + 1;
  }
  if (tweet.length < minWords) {
    generateWords(frequencyMap, minWords);
  }
  return tweet;
};

export const formWords = (words, frequencyMap) =>
  words.map(word => {
    const { forms } = frequencyMap[word];
    const formsInWords = Object.keys(forms);
    const r = Math.random();
    let chosenForm;
    for (let i = 0; i < formsInWords.length; i += 1) {
      const formWord = formsInWords[i];
      const formInfo = forms[formWord];
      if (formInfo.percentage > r) {
        chosenForm = formWord;
        break;
      }
    }
    return chosenForm;
  });

export const wordsToTweet = words =>
  words
    .reduce(
      (text, word) =>
        ['.', '?', '!', ',', ':', ';'].includes(word)
          ? `${text}${word} `
          : `${text} ${word}`,
      '',
    )
    .trim();

export const generateTweet = frequencyMap => {
  const words = generateWords(3, frequencyMap);
  const formedWords = formWords(words, frequencyMap);
  const tweet = wordsToTweet(formedWords);
  return tweet;
};
