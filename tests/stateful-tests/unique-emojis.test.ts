import { mojilogger } from "../../src";
describe('mojilogger- withId', () => {
    let consoleLogSpy: jest.SpyInstance;
  
    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    it('logs with unique emojis for multiple ids', () => {
        const emojis: string[] = [];
        const numberOfUniqueEmojis = 1778;
        for (let i = 0; i < numberOfUniqueEmojis; i++) {
          mojilogger.withId(i)('Hello, world!');
          const emoji = consoleLogSpy.mock.calls[i][0];
          emojis.push(emoji);
        }
        expect(new Set(emojis).size).toBe(numberOfUniqueEmojis);
      });
    });