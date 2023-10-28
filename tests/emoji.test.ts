import { DEFAULT_EMOJI_LIST } from "../src/config/config";
import { mojilogger } from "../src/index";
describe('mojilogger - when using id -> emoji scoping', () => {
    let consoleLogSpy: jest.SpyInstance;
    beforeEach(() => {
        mojilogger.resetAll();
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    it('logs with default emoji when calling log', () => {
        mojilogger.log('Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledWith('💬 Hello, world!');
    });
    it('logs with default list of emojis', () => {
        const list = [...DEFAULT_EMOJI_LIST];
        for (let index in list) {
            mojilogger.withId(index).log('Hello, world!');
            expect(consoleLogSpy).toHaveBeenCalledWith(`${list[index]} Hello, world!`);
        }
    });
    it('logs with different emojis after finishing emoji list', () => {
        const list = [...DEFAULT_EMOJI_LIST];
        for (let index in list) {
            mojilogger.withId(index).log('Hello, world!');
        }
        mojilogger.withId('test').log('Hello, world!');
        const lastEmoji = consoleLogSpy.mock.calls[consoleLogSpy.mock.calls.length - 1][0];
        expect(list).not.toContain(lastEmoji);
    });
    it('logs with custom list of emojis if given', () => {
        const list = ['👍', '👎'];
        mojilogger.setMojiList(list);
        for (let index in list) {
            mojilogger.withId(index).log('Hello, world!');
            expect(consoleLogSpy).toHaveBeenCalledWith(`${list[index]} Hello, world!`);
        }
    });
    it('returns the default list of emojis', () => {
        expect(mojilogger.getMojiList()).toEqual(DEFAULT_EMOJI_LIST);
    });
    it('returns the custom list of emojis', () => {
        const list = ['👍', '👎'];
        mojilogger.setMojiList(list);
        expect(mojilogger.getMojiList()).toEqual(list);
    });
    it('logs with unique emojis for different ids', () => {
        const mojiList = [];
        for (let i = 0; i < 1778; i++) {
            mojilogger.withId(i).log('Hello, world!');
            mojiList.push(consoleLogSpy.mock.calls[i][0].split(' ')[0]);
        }
        expect(mojiList).toEqual([...new Set(mojiList)]);
    });
    it('logs with same emoji for same id', () => {
        const mojiList = [];
        for (let i = 0; i < 1778; i++) {
            mojilogger.withId('hello').log(i);
            mojiList.push(consoleLogSpy.mock.calls[i][0].split(' ')[0]);
        }
        expect([...new Set(mojiList)]).toHaveLength(1);
    });
    it('logs with limit emoji after consuming all emojist', () => {
        for (let i = 0; i < 1778; i++) {
            mojilogger.withId(i).log('Hello, world!');
        }
        mojilogger.withId('test').log('Hello, world!');
        mojilogger.withId('test2').log('Hello, world!');

        const secondLastEmoji = consoleLogSpy.mock.calls[consoleLogSpy.mock.calls.length - 2][0].split(' ')[0];
        const lastEmoji = consoleLogSpy.mock.calls[consoleLogSpy.mock.calls.length - 1][0].split(' ')[0];
        expect(secondLastEmoji).toEqual('o🚫o');
        expect(lastEmoji).toEqual('o🚫o');
    });
    it('logs with custom emoji', () => {
        mojilogger.withId('test', '👍').log('Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledWith('👍 Hello, world!');
    });
    it('logs with custom emoji even if its not necessarily an emoji', () => {
        mojilogger.withId('test', 'o.o').log('Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledWith('o.o Hello, world!');
    });
    it('does not log with custom emoji if emoji is not a string', () => {
        const fakeString: any = 1;
        mojilogger.withId('test', fakeString).log('Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledWith(`${DEFAULT_EMOJI_LIST[0]} Hello, world!`);
    });
    it('gets new instance of emoji map', () => {
        const map = mojilogger.getMojiMap();
        mojilogger.log('Hello, world!');
        const map2 = mojilogger.getMojiMap();
        expect(map).not.toBe(map2);
    });
    it('gets an updated instance of the emoji mapping', () => {
        const id = 'hello';
        mojilogger.withId(id).log('Hello, world!');
        const map = mojilogger.getMojiMap();
        expect(map.get(id)).toEqual(consoleLogSpy.mock.calls[0][0].split(' ')[0]);
    });
});