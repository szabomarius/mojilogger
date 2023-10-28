export type MojiLogger = {
    /** Binds an identifier to an emoji
     * @param id - An identifier that gets matched with an emoji
     * @param emoji - Optional emoji to use instead of the generated one
     */
    withId: (id: any, customEmoji?: string) => MojiLog,
    /**
     * console logs with 💬 prepended 
     */
    log: LogFunction,
    /**
     * A map of identifiers to emojis
     * This map gets updated when you use the withId function
     */
    getMojiMap: () => Map<any, string>,
    /**
     * A map of identifiers to colors
     * This map gets updated when you use the withId function
     */
    getColorMap: () => Map<any, string>,
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
     * Sets a custom color list for the logger to use when
     * it assignes colors to ids.
     * e.g. ["#fff", "#000", "#333"]
     * #fff -> will be assigned first, then #000 -> second, #333 -> third
     * After the last color in the list is assigned, it will use #000
     * @param colorList - An array of colors to use sequentially
     */
    setColorList: (colorList: string[]) => void,
    /**
     * Returns the color list that the logger uses when assigning colors
     * to new ids. You can use this to see what the default one is.
     */
    getColorList: () => string[],
    /**
     * Resets the mapping of ids to emojis
     * Resets the emoji list to the default one
     * Use this to clean up the logger as it is stateful on import
     */
    resetAll: () => void
    
}
export type LogFunction = (message?: any, ...optionalParams: any[]) => void;
export type MojiLog = {
    log: LogFunction,
    withId: (id: any, customColor?: string) => Omit<MojiLog,'withId'>
}
export type LogOptions = {
    id: any,
    customEmoji?: string,
    extra?: {
        id: any,
        customColor?: string
    }
}

export type SymbolAssigner = {
    assign: (id: any, customSymbol: string) => string,
    setList: (list: string[]) => void,
    getList: () => string[],
    getMap: () => Map<any, string>
}

export type SymbolAssignerOptions = {
    symbolList: string[],
    symbolMap: Map<any, string>,
    defaultSymbol: string,
    symbolGenerator?: Generator<string, null, void>
}