import { DISTINCT_EMOJI_LIST } from "../config/config";
import { shuffleArray } from "./shuffle";

const unusedEmojis = shuffleArray(DISTINCT_EMOJI_LIST);

function randomEmoji(): string {
    return String.fromCodePoint(0x1F600 + Math.floor(Math.random() * 0x1F64F));
}

function getNewEmoji(): string {
    const emoji = unusedEmojis.pop();
    if (!emoji) {
        return randomEmoji();
    }
    return emoji;
}

export function getUniqueEmoji(id: any, map: Map<any, string>): string {
    const mappedEmoji = map.get(id);
    if (mappedEmoji) {
        return mappedEmoji;
    }
    const values = [...map.values()];
    if (values.length >= 3664) {
        return '🤯🤯';
    }
    let emoji: string = getNewEmoji();
    while (values.includes(emoji)) {
        emoji = getNewEmoji();
    }
    map.set(id, emoji);
    return emoji;
}