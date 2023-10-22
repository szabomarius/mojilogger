import { DEFAULT_EMOJI_LIST, NO_MORE_EMOJI } from "../config/config";
import { EmojiGenerator } from "./emoji-generator";

export class EmojiAssigner {
    private emojiList: string[];
    constructor(
        private readonly emojiMap: Map<any, string>,
        private emojiGenerator: Generator<string, null, void> = EmojiGenerator(),
        emojiList: string[] = DEFAULT_EMOJI_LIST,
    ) {
        this.emojiList = [...emojiList];
    }

    /**
     * Assigns an emoji to an id and returns it, if already assigned it returns the assigned emoji
     * @param id - An identifier that gets matched with an emoji
     * @returns - an assigned emoji for that id
     */
    public assignEmojiForId(id: any, customEmoji?: string): string {
        if (this.emojiMap.has(id)) {
            return this.emojiMap.get(id)!;
        }
        let emoji = customEmoji || this._getNewEmoji();
        const values = [...this.emojiMap.values()];
        while (emoji && values.includes(emoji)) {
            emoji = this._getNewEmoji();
        }
        if (!emoji) {
            return NO_MORE_EMOJI;
        }
        this.emojiMap.set(id, emoji);
        return emoji;
    }

    /**
     * Replaces the emoji list with a new one, if list contains
     * emojis that are already assigned, they will be skipped
     * @param emojiList - An array of emojis to use sequentially
     */
    public setEmojiList(emojiList: string[]): void {
        this.emojiList = [...emojiList];
    }

    /**
     * Returns the emoji list that the logger uses when assigning emojis
     * to new ids. You can use this to see what the default one is.
     */
    public getEmojiList(): string[] {
        return [...this.emojiList];
    }

    /**
     * Returns a map of identifiers to emojis
     * @returns - A map of identifiers to emojis
     */
    public getEmojiMap(): Map<any, string> {
        return new Map(this.emojiMap);
    }

    /**
     * Returns a new emoji from supplied list of emojist
     * or generates a new one if the list is consumed
     */
    private _getNewEmoji(): string | null {
        if (this.emojiList.length  > 0) {
            return this.emojiList.pop()!;
        }
        return this.emojiGenerator.next().value;
    }
}