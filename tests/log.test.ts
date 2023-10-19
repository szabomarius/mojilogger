import { mojilogger } from "../src";
import { DISTINCT_EMOJI_LIST } from "../src/config/config";

describe('mojilogger', () => {
  it('returns string', () => {
    expect(mojilogger.log('log', 'Hello world')).toBeDefined();
  });

  it('returns same emoji for same id', () => {
    const id = 'bob';
    const logs = [mojilogger.log(id, 'Hello world'), mojilogger.log(id, 'World hello')];
    expect(logs[0]).toEqual(logs[1]);
  });

  it('returns some random emoji if no more curated emojist available', () => {
    const id = 'bob';
    const distinctEmojisLength = DISTINCT_EMOJI_LIST.length;
    for (let i = 0; i < distinctEmojisLength; i++) {
      mojilogger.log(id + i, 'Hello world');
    }
    const newEmoji = mojilogger.log('dob', 'Hello world');
    expect(newEmoji).toEqual(expect.stringMatching(/[\u{1F600}-\u{1F64F}]/u));
  });
});
