import { mojilogger } from "../src";
import { DISTINCT_EMOJI_LIST } from "../src/config/config";

describe('mojilogger- withId', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    // Spy on console.log
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('withId returns a function', () => {
    const logger = mojilogger.withId('Hello, world!');
    expect(typeof logger).toBe('function');
  });

  it('withId does not log to console', () => {
    mojilogger.withId('a');
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it('logs to console', () => {
    mojilogger.withId('a')('Hello, world!');
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  })

  it('logs with emoji', () => {
    mojilogger.withId('a')('Hello, world!');
    const emoji = consoleLogSpy.mock.calls[0][0];
    const message = consoleLogSpy.mock.calls[0][1];
    expect(emoji.length).not.toBeGreaterThan(2);
    expect(message).toBe('Hello, world!');
  });

  it('logs with same emoji for same id', () => {
    mojilogger.withId('a')('Hello, world!');
    const boundEmoji = consoleLogSpy.mock.calls[0][0];
    for (let i = 0; i < 100; i++) {
      mojilogger.withId('a')(`${i}`);
      const emoji = consoleLogSpy.mock.calls[i+1][0];
      expect(emoji).toBe(boundEmoji);
    }
  });

  it ('logs with custom emoji', () => {
    mojilogger.withId('a', '👋')('Hello, world!');
    const emoji = consoleLogSpy.mock.calls[0][0];
    const message = consoleLogSpy.mock.calls[0][1];
    expect(emoji).toBe('👋');
    expect(message).toBe('Hello, world!');
  });

  it ('logs with same custom emoji for same id', () => {
    const boundEmoji = '👋';
    mojilogger.withId('a',boundEmoji)('Hello, world!');
    for (let i = 0; i < 100; i++) {
      mojilogger.withId('a')(`${i}`);
      const emoji = consoleLogSpy.mock.calls[i+1][0];
      expect(emoji).toBe(boundEmoji);
    }
  });

  it('logs with different emoji for different id', () => {
    mojilogger.withId('a')('1');
    mojilogger.withId('b')('2');
    expect(consoleLogSpy.mock.calls[0][0]).not.toBe(consoleLogSpy.mock.calls[1][0]);
  });

  it('logs with unique emojis for multiple ids', () => {
    const emojis: string[] = [];
    const numberOfUniqueEmojis = 3665;
    for (let i = 0; i < numberOfUniqueEmojis; i++) {
      mojilogger.withId(i)('Hello, world!');
      const emoji = consoleLogSpy.mock.calls[i][0];
      emojis.push(emoji);
    }
    expect(new Set(emojis).size).toBe(numberOfUniqueEmojis);
  });

  it('uses hardcoded distinct list for the first emojis', () => {
      const distinctEmojiList = [...DISTINCT_EMOJI_LIST];
      for (let i = 0; i < distinctEmojiList.length; i++) {
        mojilogger.withId(i)('Hello, world!');
        const emoji = consoleLogSpy.mock.calls[i][0];
        expect(distinctEmojiList).toContain(emoji);
      }
  });

});
