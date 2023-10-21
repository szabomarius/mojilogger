import { NO_ID_SYMBOL } from "./config/config";
import { isEmojiString } from "./utils/checks";
import { getUniqueEmoji } from "./utils/generator";

type log = (id: any, message?: any, ...optionalParams: any[]) => void;
type logOptions = {
    id: any,
    customEmoji?: string
}

const emojiMap: Map<any, string> = new Map();

function log({id , customEmoji}: logOptions, message?: any, ...optionalParams: any[]): void {
    let emoji: string;
    if (customEmoji) {
        emoji = isEmojiString(customEmoji) ? customEmoji : '💬';
        emojiMap.set(id, emoji);
    } else {
        emoji = getUniqueEmoji(id, emojiMap);
    }
    console.log(emoji, message, ...optionalParams);
}

export const mojilogger = {
    /** Binds an identifier to an emoji
     * @param id - An identifier that gets matched with an emoji
     * @param emoji - Optional emoji to use instead of the generated one
     */
    withId: (id: any, customEmoji?: string): log => log.bind(null, { id , customEmoji } ),
    /**
     * console logs with 💬 prepended 
     */
    log: log.bind(null, {id: NO_ID_SYMBOL, customEmoji: '💬'})
};