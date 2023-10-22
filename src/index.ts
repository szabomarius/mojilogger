import { NO_ID_SYMBOL } from "./config/config";
import { isEmojiString } from "./utils/utils";
import { LogOptions, MojiLogger } from "./types/types";
import { EmojiAssigner } from "./core/emoji-assigner";

let mojiAssigner = new EmojiAssigner(new Map());

function log({id , customEmoji}: LogOptions, message?: any, ...optionalParams: any[]): void {
    let emoji: string;
    if (customEmoji && isEmojiString(customEmoji)) {
        emoji = mojiAssigner.assignEmojiForId(id, customEmoji);
    } else {
        emoji = mojiAssigner.assignEmojiForId(id);
    }
    console.log(emoji, message, ...optionalParams);
}

export const mojilogger: MojiLogger = {
    withId: (id: any, customEmoji?: string) => {
        return {
            log: log.bind(null, {id, customEmoji})
        }
    },
    log: log.bind(null, {id: NO_ID_SYMBOL, customEmoji: '💬'}),
    getMojiMap: () => {
        return mojiAssigner.getEmojiMap();
    },
    setMojiList: (emojiList: string[]) => {
        mojiAssigner.setEmojiList(emojiList);
    },
    getMojiList: () => {
        return mojiAssigner.getEmojiList();
    },
    resetAll: () => {
        mojiAssigner = new EmojiAssigner(new Map());
    }
};