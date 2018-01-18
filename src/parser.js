const URL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const PUNCTUATIONS = /([\.,:;!\+&]+)/gi;
const END_PUNCS = ['.', '?', '!'];

/**
 * parse tweet text string into array of words
 * @param  {[string]} tweet the content string of a tweet
 * @return {[array]}     words in the tweet in array excluding url, username and punctuations
 */
export const parseTweet = tweet => {
  const words = tweet
    .replace(/\&amp\;/gi, '&')
    .split(' ')
    .filter(word => !word.startsWith('@'))
    .filter(word => !word.match(URL))
    .join(' ')
    .replace(PUNCTUATIONS, ' $1 ')
    .replace(/\s+/gi, ' ') // trim excessive whitespace
    .split(' ')
    .filter(word => !!word);
  return words;
};

export const parseWord = word => word.toLowerCase();

export const isEndPuc = token => END_PUNCS.includes(token);

export default {
  parseTweet,
  parseWord,
  isEndPuc,
};
