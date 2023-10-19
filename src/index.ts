import { getUniqueEmoji } from "./utils/generator";

const emojiMap: Map<any, string> = new Map();

const log = (id: any, message?: any, ...optionalParams: any[]): string => {
    console.log(id, message, optionalParams);
    const emoji = getUniqueEmoji(id, emojiMap);
    console.log(emoji, message, ...optionalParams);
    return emoji;
}

export const mojilogger = {
    log
};