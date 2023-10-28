import { mojilogger } from "../src";
import { DEFAULT_COLOR_LIST, DEFAULT_EMOJI_LIST } from "../src/config/config";

describe('mojilogger - when using id -> color scoping', () => {
    let consoleLogSpy: jest.SpyInstance;
    beforeEach(() => {
        mojilogger.resetAll();
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    it('logs with color scoping', () => {
        mojilogger.withId('test').withId('other').log('Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledWith(`%c ${DEFAULT_EMOJI_LIST[0]} Hello, world!`, `background-color: ${DEFAULT_COLOR_LIST[0]}; color: #fff`);
    });

    it('logs with custom color scoping', () => {
        mojilogger.withId('test').withId('other','#333').log('Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledWith(`%c ${DEFAULT_EMOJI_LIST[0]} Hello, world!`, `background-color: #333; color: #fff`);
    });
    it('logs with same color for same id', () => {
        mojilogger.withId('test').withId('other','#333').log('Hello, world!');
        mojilogger.withId('another-main-id').withId('other').log('Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledTimes(2);

        expect(consoleLogSpy.mock.calls).toEqual([
            [expect.anything(), `background-color: #333; color: #fff`],
            [expect.anything(), `background-color: #333; color: #fff`]
        ]);
    });
    it('logs with different color until reaching the end of list', () => {
        const list = [...DEFAULT_COLOR_LIST];
        for (let index in list) {
            mojilogger.withId('ids').withId(index).log('h');
            expect(consoleLogSpy).toHaveBeenCalledWith(`%c ${DEFAULT_EMOJI_LIST[0]} h`, `background-color: ${list[index]}; color: #fff`);
        }
    });
    it('repeats the #000 color when reaching the end of list', () => {
        const list = [...DEFAULT_COLOR_LIST];
        for (let index in list) {
            mojilogger.withId('id').withId(index).log('h');
            expect(consoleLogSpy).toHaveBeenCalledWith(`%c ${DEFAULT_EMOJI_LIST[0]} h`, `background-color: ${list[index]}; color: #fff`);
        }
        for (let index in list) {
            mojilogger.withId('id').withId(index + 'new').log('h');
            expect(consoleLogSpy).toHaveBeenCalledWith(`%c ${DEFAULT_EMOJI_LIST[0]} h`, `background-color: #000; color: #fff`);
        }
    });
    it('returns the list of default colors', () => {
        expect(mojilogger.getColorList()).toEqual(DEFAULT_COLOR_LIST);
    });
    it('returns the list of custom colors', () => {
        const list = ['#fff', '#000'];
        mojilogger.setColorList(list);
        expect(mojilogger.getColorList()).toEqual(list);
    });
    it('returns the map of ids to colors', () => {
        const list = ['#fff', '#000'];
        mojilogger.setColorList(list);
        mojilogger.withId('id').withId('id2').log('h');
        expect(mojilogger.getColorMap()).toEqual(new Map([['id2', '#fff']]));
    });
    it('returns the map of ids to colors with custom color', () => {
        const list = ['#fff', '#000'];
        mojilogger.setColorList(list);
        mojilogger.withId('id', '#333').withId('id2', '#888').log('h');
        expect(mojilogger.getColorMap()).toEqual(new Map([['id2', '#888']]));
    });
    it('uses the custom color list', () => {
        const list = ['#fff', '#000'];
        mojilogger.setColorList(list);
        mojilogger.withId('id').withId('id2').log('h');
        expect(consoleLogSpy).toHaveBeenCalledWith(`%c ${DEFAULT_EMOJI_LIST[0]} h`, `background-color: #fff; color: #fff`);
    });

    it('colors just the emoji when message is not a string', () => {
        const list = ['#fff', '#000'];
        mojilogger.setColorList(list);
        let message = { hello: 'world' };
        mojilogger.withId(1).withId(2).log(message);
        expect(consoleLogSpy).toHaveBeenCalledWith(`%c ${DEFAULT_EMOJI_LIST[0]} `, `background-color: #fff; color: #fff`, message);
    });
});