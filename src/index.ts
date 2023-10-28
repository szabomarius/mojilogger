import { DEFAULT_COLOR_LIST, DEFAULT_EMOJI_LIST, NO_MORE_EMOJI } from './config/config';
import { EmojiGenerator } from './core/emoji-generator';
import { Assigner } from './core/assigner';
import { Mojilogger } from './core/moji-logger';
import { MojiLogger } from './types/types';

const mojiFactory = () => {
    return new Assigner({
        defaultSymbol: NO_MORE_EMOJI,
        symbolList: DEFAULT_EMOJI_LIST,
        symbolMap: new Map(),
        symbolGenerator: EmojiGenerator(),
    })
}

const colorFactory = () => {
    return new Assigner({
        defaultSymbol: '#000',
        symbolList: DEFAULT_COLOR_LIST,
        symbolMap: new Map(),
    })
}

export const mojilogger: MojiLogger = new Mojilogger(mojiFactory, colorFactory);
export type { MojiLog } from './types/types';