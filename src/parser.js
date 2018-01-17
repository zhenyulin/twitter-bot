const URL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const PUNCTUATION_MARKS = /([\.,:;!\+&]+)/gi;
const END_PUNCS = ['.', '?', '!'];

export const parseTweet = tweet => {
  const words = tweet
    .replace(/\&amp\;/gi, '&')
    .split(' ')
    .filter(word => !word.startWith('@'))
    .filter(word => !word.match(URL))
    .join(' ')
    .replace(PUNCTUATION_MARKS, ' $1 ')
    .replace(/\s+/gi, ' ') // trim excessive whitespace
    .split(' ')
    .filter(word => !!word);
  return words;
};

export const parseWord = word => word.toLowerCase().replace(/[\-'"]/gi, '');

export const isEndPuc = token => END_PUNCS.includes(token);

export default {
  parseTweet,
  parseWord,
  isEndPuc,
};
