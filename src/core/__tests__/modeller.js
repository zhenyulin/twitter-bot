import {
  updateModel,
  buildLanguageModel,
  buildFrequencyMap,
} from '../modeller';

describe('updateModel', () => {
  it('create the right sentence model', () => {
    const BASIC_WORDS_EXAMPLE = ['test', 'a', 'b', 'c', 'a', 'B'];
    const model = updateModel({}, BASIC_WORDS_EXAMPLE);
    const expected = {
      __start: { next: { test: 1 }, forms: { __start: 1 }, count: 1 },
      test: { next: { a: 1 }, forms: { test: 1 }, count: 1 },
      a: { next: { b: 2 }, forms: { a: 2 }, count: 2 },
      b: { next: { c: 1, __end: 1 }, forms: { b: 1, B: 1 }, count: 2 },
      c: { next: { a: 1 }, forms: { c: 1 }, count: 1 },
    };
    expect(model).toMatchObject(expected);
  });
});

describe('buildLanguageModel', () => {
  it('create the right language model for ONE_LINE_EXAMPLE', () => {
    const ONE_LINE_EXAMPLE = ['test a b c a B'];
    const model = buildLanguageModel(ONE_LINE_EXAMPLE);
    const expected = {
      __start: { next: { test: 1 }, forms: { __start: 1 }, count: 1 },
      test: { next: { a: 1 }, forms: { test: 1 }, count: 1 },
      a: { next: { b: 2 }, forms: { a: 2 }, count: 2 },
      b: { next: { c: 1, __end: 1 }, forms: { b: 1, B: 1 }, count: 2 },
      c: { next: { a: 1 }, forms: { c: 1 }, count: 1 },
    };
    expect(model).toMatchObject(expected);
  });

  it('create the right language model for TWO_LINE_EXAMPLE', () => {
    const TWO_LINE_EXAMPLE = ['test a b c a B', 'test a b c a C'];
    const model = buildLanguageModel(TWO_LINE_EXAMPLE);
    const expected = {
      __start: { next: { test: 2 }, forms: { __start: 2 }, count: 2 },
      test: { next: { a: 2 }, forms: { test: 2 }, count: 2 },
      a: { next: { b: 3, c: 1 }, forms: { a: 4 }, count: 4 },
      b: { next: { c: 2, __end: 1 }, forms: { b: 2, B: 1 }, count: 3 },
      c: { next: { a: 2, __end: 1 }, forms: { c: 2, C: 1 }, count: 3 },
    };
    expect(model).toMatchObject(expected);
  });
});

describe('buildFrequencyMap', () => {
  it('create correct frequency map', () => {
    const TWO_LINE_EXAMPLE = ['test a b c a B', 'test a b c a C'];
    const languageModel = buildLanguageModel(TWO_LINE_EXAMPLE);
    const frequencyMap = buildFrequencyMap(languageModel);
    console.log(frequencyMap);
  });
});
