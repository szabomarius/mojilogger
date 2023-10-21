import { mojilogger } from "../src";

describe('mojilogger- withId', () => {
    let consoleLogSpy: jest.SpyInstance;
  
    beforeEach(() => {
      // Spy on console.log
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });
  
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    it('logs to console', () => {
      mojilogger.log('Hello, world!');
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('logs to console with hardcoded emoji 💬', () => {
        mojilogger.log('Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledWith('💬', 'Hello, world!');
    });

    it('logs to console with same hardcoded emoji 💬 on multiple calls', () => {
        mojilogger.log('Hello, world!');
        mojilogger.log('Goodbye, planet!');
        expect(consoleLogSpy).toHaveBeenCalledWith('💬', 'Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledWith('💬', 'Goodbye, planet!');
    });
});