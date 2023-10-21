import { DISTINCT_EMOJI_LIST } from "../config/config";
import { shuffleArray } from "../utils/shuffle";
import { generateNewEmoji } from "./new-emoji";

const unusedEmojis = shuffleArray(DISTINCT_EMOJI_LIST);

function getNewEmoji(): string | null {
    if (unusedEmojis.length  > 0) {
        return unusedEmojis.pop()!;
    }
    return generateNewEmoji();
}

export function getUniqueEmoji(id: any, map: Map<any, string>): string {
    if (map.has(id)) {
        return map.get(id)!;
    }
    let emoji = getNewEmoji();
    const values = [...map.values()];
    while (emoji && values.includes(emoji)) {
        emoji = getNewEmoji();
    }
    if (!emoji) {
        return `(x_x )`;
    }
    map.set(id, emoji);
    return emoji;
}