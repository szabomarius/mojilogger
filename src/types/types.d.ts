export type MojiLogger = {
    /** Binds an identifier to an emoji
     * @param id - An identifier that gets matched with an emoji
     * @param emoji - Optional emoji to use instead of the generated one
     */
    withId: (id: any, customEmoji?: string) => Log,
    /**
     * console logs with 💬 prepended 
     */
    log: Log,
    /**
     * A map of identifiers to emojis
     * This map gets updated when you use the withId function
     */
    mappedMojis: Map<any, string>,
    /**
     * Sets a custom emoji list for the logger to use when
     * it assignes emojist to ids.
     * e.g. ["🌟", "💧", "❤️"]
     * 🌟 -> will be assigned first, then 💧 -> second, ❤️ -> third
     * After the last emoji in the list is assigned, it will use other emojis
     * until it reaches the end of the unicode emoji list.
     * @param emojiList - An array of emojis to use sequentially
     */
    setMojiList: (emojiList: string[]) => void,
    /**
     * Returns the emoji list that the logger uses when assigning emojis
     * to new ids. You can use this to see what the default one is.
     */
    getMojiList: () => string[],
    /**
     * Resets the mapping of ids to emojis
     * Resets the emoji list to the default one
     * Use this to clean up the logger as it is stateful on import
     */
    resetAll: () => void
    
}
export type Log = (id: any, message?: any, ...optionalParams: any[]) => void;
export type LogOptions = {
    id: any,
    customEmoji?: string
}