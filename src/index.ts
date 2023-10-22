import { NO_ID_SYMBOL } from "./config/config";
import { isEmojiString } from "./utils/checks";
import { getUniqueEmoji } from "./stateful/generator";
import { Log, LogOptions, MojiLogger } from "./types/types";

const emojiMap: Map<any, string> = new Map();

function log({id , customEmoji}: LogOptions, message?: any, ...optionalParams: any[]): void {
    let emoji: string;
    if (customEmoji) {
        emoji = isEmojiString(customEmoji) ? customEmoji : '💬';
        emojiMap.set(id, emoji);
    } else {
        emoji = getUniqueEmoji(id, emojiMap);
    }
    console.log(emoji, message, ...optionalParams);
}

export const mojilogger: MojiLogger = {
    withId: (id: any, customEmoji?: string): Log => log.bind(null, { id , customEmoji } ),
    log: log.bind(null, {id: NO_ID_SYMBOL, customEmoji: '💬'}),
    mappedMojis: emojiMap,
    setMojiList: (emojiList: string[]) => {
        emojiMap.clear();
        emojiList.forEach((emoji, index) => emojiMap.set(index, emoji));
    },
    getMojiList: () => [...emojiMap.values()],
    resetAll: () => {
        emojiMap.clear();
        emojiMap.set(NO_ID_SYMBOL, '💬');
    }
};