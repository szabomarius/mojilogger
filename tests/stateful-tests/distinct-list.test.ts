

import { mojilogger } from "../../src";
import { DEFAULT_EMOJI_LIST } from "../../src/config/config";
describe('mojilogger- withId', () => {
    let consoleLogSpy: jest.SpyInstance;
  
    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    it('uses hardcoded distinct list for the first emojis', () => {
        const distinctEmojiList = [...DEFAULT_EMOJI_LIST];
        for (let i = 0; i < distinctEmojiList.length; i++) {
          mojilogger.withId(i)('Hello, world!');
          const emoji = consoleLogSpy.mock.calls[i][0];
          expect(distinctEmojiList).toContain(emoji);
        }
    });
});